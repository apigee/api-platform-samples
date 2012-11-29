#!/bin/bash

source ../setenv.sh

apiName=samples-apikey
basePath=/samples-apikey

#Delete App
curl -u $credentials "$url/v1/o/$org/developers/tester@sample.com/apps/SampleApp" -X DELETE -k

# Delete Developer
curl -u $credentials "$url/v1/o/$org/developers/tester@sample.com" -X DELETE -k

# Delete APIProduct
curl -u $credentials "$url/v1/o/$org/apiproducts/ApiKeyValidationSample" -X DELETE -k
