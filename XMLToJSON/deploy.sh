#!/bin/bash

source setenv.sh


apiName=4g-samples-xmltojson
basePath=/4g-samples-xmltojson

find . -name '*.DS_Store' -type f -delete

##Cleanup
rm -rf apiproxy.zip
zip -r apiproxy apiproxy
sh cleanup.sh


##Import the sample in gateway instance. 
curl -u $credentials "$url/v1/organizations/$org/apis?action=import&name=$apiName" -T apiproxy.zip -H "Content-Type: application/octet-stream" -X POST -k

##Deploy the sample in gateway instance.
curl -u $credentials "$url/v1/organizations/$org/apis/$apiName/revisions/1/deployments?action=deploy&env=$environment&basepath=$basePath" -X POST -H "Content-Type: application/octet-stream" -k
