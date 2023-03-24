#!/bin/sh

set -x -e

npm run cdk deploy

aws cloudformation describe-stacks \
    --query 'Stacks[0].Outputs[?OutputKey==`TraderflowDeployBucket`].OutputValue' --output text \
    --region ap-southeast-2 --stack-name TraderflowDeploymentStack | \
    xargs -I % aws s3 cp public s3://% --recursive

aws cloudformation describe-stacks \
    --query 'Stacks[0].Outputs[?OutputKey==`TraderflowCloudfront`].OutputValue' --output text \
    --region ap-southeast-2 --stack-name TraderflowDeploymentStack | \
    xargs -I % aws cloudfront create-invalidation --distribution-id % --paths '/*'

