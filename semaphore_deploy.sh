#!/bin/bash

set -e

export EB_VERSION=`git rev-parse --short=7 HEAD`
echo "Building server image with git hash $EB_VERSION..."
docker build -t 818972891940.dkr.ecr.us-east-1.amazonaws.com/datavore/website:$EB_VERSION .

echo "Pushing server image..."
$(aws ecr get-login --region us-east-1 --no-include-email)
docker push 818972891940.dkr.ecr.us-east-1.amazonaws.com/datavore/website:$EB_VERSION