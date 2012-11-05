#!/bin/bash

source setenv.sh

apiName=4g-samples-apikey
basePath=/4g-samples-apikey


find . -name '*.DS_Store' -type f -delete

#1. Undeploy
curl -u $credentials "$url/v1/organizations/$org/apis/4g-samples-apikey/revisions/1/deployments?action=undeploy&env=$environment&basepath=$basePath" -X POST -H "Content-Type: application/octet-stream" -k

#2. Delete Sample
curl -u $credentials "$url/v1/organizations/$org/apis/4g-samples-apikey" -X DELETE -k

#3. Delete App
curl -u $credentials "$url/v1/organizations/$org/developers/4gsample@apigee.com/apps/4gSampleApp" -X DELETE -k

#4. Delete Developer
curl -u $credentials "$url/v1/organizations/$org/developers/4gsample@apigee.com" -X DELETE -k

#5. Delete APIProduct
curl -u $credentials "$url/v1/organizations/$org/apiproducts/ApiKeySampleProduct" -X DELETE -k
