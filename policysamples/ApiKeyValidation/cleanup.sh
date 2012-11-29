#!/bin/bash

source ../setenv.sh

apiName=samples-apikey
basePath=/samples-apikey

#1. Undeploy
curl -u $credentials "$url/v1/organizations/$org/apis/samples-apikey/revisions/1/deployments?action=undeploy&env=$environment&basepath=$basePath" -X POST -H "Content-Type: application/octet-stream" -k

#2. Delete Sample
curl -u $credentials "$url/v1/organizations/$org/apis/samples-apikey" -X DELETE -k

#3. Delete App
curl -u $credentials "$url/v1/organizations/$org/developers/sample@apigee.com/apps/SampleApp" -X DELETE -k

#4. Delete Developer
curl -u $credentials "$url/v1/organizations/$org/developers/sample@apigee.com" -X DELETE -k

#5. Delete APIProduct
curl -u $credentials "$url/v1/organizations/$org/apiproducts/ApiKeySampleProduct" -X DELETE -k
