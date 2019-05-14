#!/bin/bash

set -e

export EB_VERSION=`git rev-parse --short=7 HEAD`

echo "Building image..."
docker build --no-cache \
	--build-arg AWS_ACCESS_KEY_ID=$AWS_ACCESS_KEY_ID \
	--build-arg AWS_SECRET_ACCESS_KEY=$AWS_SECRET_ACCESS_KEY \
	-t gcr.io/datavore-dev/datavore/website:$EB_VERSION \
	-t 818972891940.dkr.ecr.us-east-1.amazonaws.com/datavore/website:$EB_VERSION .
