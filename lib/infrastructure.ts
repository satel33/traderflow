import {
  CfnOutput,
  Duration,
  Fn,
  RemovalPolicy,
  Stack,
  StackProps,
} from "aws-cdk-lib"
import {
  CfnApiKey,
  CfnDataSource,
  CfnGraphQLApi,
  CfnGraphQLSchema,
  CfnResolver,
} from "aws-cdk-lib/aws-appsync"
import * as acm from "aws-cdk-lib/aws-certificatemanager"
import * as cloudfront from "aws-cdk-lib/aws-cloudfront"
import { ViewerProtocolPolicy } from "aws-cdk-lib/aws-cloudfront"
import * as origins from "aws-cdk-lib/aws-cloudfront-origins"
import {
  AttributeType,
  BillingMode,
  StreamViewType,
  Table,
} from "aws-cdk-lib/aws-dynamodb"
import * as iam from "aws-cdk-lib/aws-iam"
import {
  ManagedPolicy,
  Role,
  ServicePrincipal,
} from "aws-cdk-lib/aws-iam"
import * as route53 from "aws-cdk-lib/aws-route53"
import * as route53targets from "aws-cdk-lib/aws-route53-targets"
import * as s3 from "aws-cdk-lib/aws-s3"
import { Construct } from "constructs"

export class Infrastructure extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const domainName = "traderflow.com";

    const assetsBucket = new s3.Bucket(this, 'website', {
      publicReadAccess: false,
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
      removalPolicy: RemovalPolicy.RETAIN,
      accessControl: s3.BucketAccessControl.PRIVATE,
      objectOwnership: s3.ObjectOwnership.BUCKET_OWNER_ENFORCED,
      encryption: s3.BucketEncryption.S3_MANAGED,
    });

    const cloudfrontOriginAccessIdentity = new cloudfront.OriginAccessIdentity(this, 'CloudFrontOriginAccessIdentity');

    assetsBucket.addToResourcePolicy(new iam.PolicyStatement({
      actions: ['s3:GetObject'],
      resources: [assetsBucket.arnForObjects('*')],
      principals: [new iam.CanonicalUserPrincipal(cloudfrontOriginAccessIdentity.cloudFrontOriginAccessIdentityS3CanonicalUserId)],
    }));

    const zone = route53.HostedZone.fromLookup(this, 'HostedZone', { domainName: domainName });

    const responseHeaderPolicy = new cloudfront.ResponseHeadersPolicy(this, 'SecurityHeadersResponseHeaderPolicy', {
      comment: 'Security headers response header policy - designed for gatsby',
      securityHeadersBehavior: {
        contentSecurityPolicy: {
          override: true,
          contentSecurityPolicy: "style-src 'self' 'unsafe-inline' fonts.googleapis.com; img-src 'self' data:; script-src 'self' 'unsafe-inline'"
        },
        strictTransportSecurity: {
          override: true,
          accessControlMaxAge: Duration.days(2 * 365),
          includeSubdomains: true,
          preload: true
        },
        contentTypeOptions: {
          override: true
        },
        referrerPolicy: {
          override: true,
          referrerPolicy: cloudfront.HeadersReferrerPolicy.STRICT_ORIGIN_WHEN_CROSS_ORIGIN
        },
        xssProtection: {
          override: true,
          protection: true,
          modeBlock: true
        },
        frameOptions: {
          override: true,
          frameOption: cloudfront.HeadersFrameOption.DENY
        }
      }
    });

    const certificateArn = "arn:aws:acm:us-east-1:766787173436:certificate/7b7044ac-257a-424f-959b-172e7afdb6c2"
    const certificate = acm.Certificate.fromCertificateArn(this, 'domainCert', certificateArn);

    const cloudfrontDistribution = new cloudfront.Distribution(this, 'CloudFrontDistribution', {
      certificate: certificate, 
      domainNames: [ domainName ],
      defaultRootObject: 'index.html',
      defaultBehavior: {
        origin: new origins.S3Origin(assetsBucket, { originAccessIdentity: cloudfrontOriginAccessIdentity }),
        viewerProtocolPolicy: ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
        responseHeadersPolicy: responseHeaderPolicy
      },
    });


    const tableName = 'news'

    const tfApi = new CfnGraphQLApi(this, 'ItemsApi', {
      name: 'traderflow-api',
      authenticationType: 'API_KEY'
    });

    new CfnApiKey(this, 'ItemsApiKey', {
      apiId: tfApi.attrApiId
    });

    const apiSchema = new CfnGraphQLSchema(this, 'ItemsSchema', {
      apiId: tfApi.attrApiId,
      definition: `type ${tableName} {
        ${tableName}Id: ID!
        name: String
      }
      type Paginated${tableName} {
        items: [${tableName}!]!
        nextToken: String
      }
      type Query {
        all(limit: Int, nextToken: String): Paginated${tableName}!
        getOne(${tableName}Id: ID!): ${tableName}
      }
      type Mutation {
        save(name: String!): ${tableName}
        delete(${tableName}Id: ID!): ${tableName}
      }
      type Schema {
        query: Query
        mutation: Mutation
      }`
    });

    const itemsTable = new Table(this, 'ItemsTable', {
      tableName: tableName,
      partitionKey: {
        name: `${tableName}Id`,
        type: AttributeType.STRING
      },
      billingMode: BillingMode.PAY_PER_REQUEST,
      stream: StreamViewType.NEW_IMAGE,

      removalPolicy: RemovalPolicy.DESTROY, // RETAIN for production code
    });

    const itemsTableRole = new Role(this, 'ItemsDynamoDBRole', {
      assumedBy: new ServicePrincipal('appsync.amazonaws.com')
    });

    itemsTableRole.addManagedPolicy(ManagedPolicy.fromAwsManagedPolicyName('AmazonDynamoDBFullAccess'));

    const dataSource = new CfnDataSource(this, 'ItemsDataSource', {
      apiId: tfApi.attrApiId,
      name: 'ItemsDynamoDataSource',
      type: 'AMAZON_DYNAMODB',
      dynamoDbConfig: {
        tableName: itemsTable.tableName,
        awsRegion: this.region
      },
      serviceRoleArn: itemsTableRole.roleArn
    });

    const getOneResolver = new CfnResolver(this, 'GetOneQueryResolver', {
      apiId: tfApi.attrApiId,
      typeName: 'Query',
      fieldName: 'getOne',
      dataSourceName: dataSource.name,
      requestMappingTemplate: `{
        "version": "2017-02-28",
        "operation": "GetItem",
        "key": {
          "${tableName}Id": $util.dynamodb.toDynamoDBJson($ctx.args.${tableName}Id)
        }
      }`,
      responseMappingTemplate: `$util.toJson($ctx.result)`
    });
    getOneResolver.addDependency(apiSchema);

    const getAllResolver = new CfnResolver(this, 'GetAllQueryResolver', {
      apiId: tfApi.attrApiId,
      typeName: 'Query',
      fieldName: 'all',
      dataSourceName: dataSource.name,
      requestMappingTemplate: `{
        "version": "2017-02-28",
        "operation": "Scan",
        "limit": $util.defaultIfNull($ctx.args.limit, 20),
        "nextToken": $util.toJson($util.defaultIfNullOrEmpty($ctx.args.nextToken, null))
      }`,
      responseMappingTemplate: `$util.toJson($ctx.result)`
    });
    getAllResolver.addDependency(apiSchema);

    const saveResolver = new CfnResolver(this, 'SaveMutationResolver', {
      apiId: tfApi.attrApiId,
      typeName: 'Mutation',
      fieldName: 'save',
      dataSourceName: dataSource.name,
      requestMappingTemplate: `{
        "version": "2017-02-28",
        "operation": "PutItem",
        "key": {
          "${tableName}Id": { "S": "$util.autoId()" }
        },
        "attributeValues": {
          "name": $util.dynamodb.toDynamoDBJson($ctx.args.name)
        }
      }`,
      responseMappingTemplate: `$util.toJson($ctx.result)`
    });
    saveResolver.addDependency(apiSchema);

    const deleteResolver = new CfnResolver(this, 'DeleteMutationResolver', {
      apiId: tfApi.attrApiId,
      typeName: 'Mutation',
      fieldName: 'delete',
      dataSourceName: dataSource.name,
      requestMappingTemplate: `{
        "version": "2017-02-28",
        "operation": "DeleteItem",
        "key": {
          "${tableName}Id": $util.dynamodb.toDynamoDBJson($ctx.args.${tableName}Id)
        }
      }`,
      responseMappingTemplate: `$util.toJson($ctx.result)`
    });
    deleteResolver.addDependency(apiSchema);

    new route53.ARecord(this, 'StaticWebsite', {
      recordName: domainName,
      target: route53.RecordTarget.fromAlias(new route53targets.CloudFrontTarget(cloudfrontDistribution)),
      zone
    });

    new route53.CnameRecord(this, 'TraderflowAPI', {
      recordName: `api.${domainName}`,
      domainName: Fn.select(2, Fn.split('/', tfApi.attrGraphQlUrl)),
      zone
    })

    new CfnOutput(this, "TraderflowDeployBucket", { value: assetsBucket.bucketName });
  }
}