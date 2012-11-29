#!/bin/bash

source ../setenv.sh

apiName=samples-apikey
basePath=/samples-apikey

set -x

##Cleanup
sh cleanup.sh

##Create APIProduct
curl -u $credentials "$url/v1/o/$org/apiproducts" -H "Content-Type: application/json" -X POST -T createAPIProduct.json

##Create Developer:
curl -u $credentials "$url/v1/o/$org/developers" -H "Content-Type: application/json" -X POST -T createDeveloper.json

##Create Developer Apps:
curl -u $credentials "$url/v1/o/$org/developers/tester@sample.com/apps" -H "Content-Type: application/json" -X POST -T createDeveloperApp.json

##Import and Deploy
../../tools/deploy.py -n $apiName -u $credentials -o $org -e $environment -d ../ApiKeyValidation

##Get App key and secret
curl -u $credentials "$url/v1/o/$org/developers/tester@sample.com/apps/MyTestApp"
