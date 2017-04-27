#!/bin/bash

echo 'Installing dependencies...'
rm -rf node_modules
npm install --no-progress

echo 'Compiling static files...'
npm run compiler

echo 'Deploying to S3...'
aws s3 sync --acl public-read --delete ./bin s3://$S3_BUCKET_NAME

echo 'Busting CloudFront cache...'
export TIMESTAMP=$(date +%s)
sed -e 's/\[\[TIMESTAMP\]\]/'${TIMESTAMP}'/g' aws_invbatch.json.tpl > aws_invbatch.json
aws configure set preview.cloudfront true
aws cloudfront create-invalidation --invalidation-batch file://aws_invbatch.json --distribution-id $CLOUDFRONT_DISTRIBUTION_ID