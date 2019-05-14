#!/bin/bash

set -e

echo "Pushing image"
export EB_VERSION=`git rev-parse --short=7 HEAD`

$(aws ecr get-login --region us-east-1 --no-include-email)
docker push 818972891940.dkr.ecr.us-east-1.amazonaws.com/datavore/website:$EB_VERSION

echo "to gke"
./gke-tools-setup
./gke-auth
docker push gcr.io/datavore-dev/datavore/website:$EB_VERSION

