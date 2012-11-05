#!/bin/bash

source setenv.sh

apiName=4g-samples-apikey
basePath=/4g-samples-apikey

find . -name '*.DS_Store' -type f -delete

##Cleanup
rm -rf apiproxy.zip
zip -r apiproxy apiproxy
sh cleanup.sh

##Create APIProduct
curl -u $credentials "$url/v1/organizations/$org/apiproducts" -T createAPIProduct.xml -H "Content-Type: application/xml" -X POST -k

##Create Developer:
curl -u $credentials "$url/v1/organizations/$org/developers" -T createDeveloper.xml -H "Content-Type: application/xml" -X POST -k

##Create Developer Apps:
curl -u $credentials "$url/v1/organizations/$org/developers/4gsample@apigee.com/apps" -T createDeveloperApp.xml -H "Content-Type: application/xml" -X POST -k

##Import the sample in gateway instance. 
curl -u $credentials "$url/v1/organizations/$org/apis?action=import&name=4g-samples-apikey" -T apiproxy.zip -H "Content-Type: application/octet-stream" -X POST -k

##Deploy the sample in gateway instance.
curl -u $credentials "$url/v1/organizations/$org/apis/4g-samples-apikey/revisions/1/deployments?action=deploy&env=$environment&basepath=$basePath" -X POST -H "Content-Type: application/octet-stream" -k
