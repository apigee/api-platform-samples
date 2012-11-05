#!/bin/bash

source setenv.sh


apiName=4g-samples-contentrouting
basePath=/4g-samples-contentrouting

find . -name '*.DS_Store' -type f -delete

#1. Undeploy
curl -u $credentials "$url/v1/organizations/$org/apis/$apiName/revisions/1/deployments?action=undeploy&env=$environment&basepath=$basePath" -X POST -H "Content-Type: application/octet-stream" -k

#2. Delete Sample
curl -u $credentials "$url/v1/organizations/$org/apis/$apiName" -X DELETE -k
