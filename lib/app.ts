import {
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
import {
  AttributeType,
  BillingMode,
  StreamViewType,
  Table,
} from "aws-cdk-lib/aws-dynamodb"
import {
  ManagedPolicy,
  Role,
  ServicePrincipal,
} from "aws-cdk-lib/aws-iam"
import * as route53 from "aws-cdk-lib/aws-route53"
import { Construct } from "constructs"

export class Infrastructure extends Stack {
    constructor(scope: Construct, id: string, props?: StackProps) {
        super(scope, id, props);

        const domainName = "traderflow.com";
        const zone = route53.HostedZone.fromLookup(this, 'HostedZone', { domainName: domainName });

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

        new route53.CnameRecord(this, 'TraderflowAPI', {
            recordName: `api.${domainName}`,
            domainName: Fn.select(2, Fn.split('/', tfApi.attrGraphQlUrl)),
            zone
        })
    }
}
