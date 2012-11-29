#!/bin/bash

source ../setenv.sh

apiName=samples-dynamic-endpoint
basePath=/samples-dynamic-endpoint

##Cleanup
sh cleanup.sh

##Import and Deploy
../../tools/deploy.py -n $apiName -u $credentials -o $org -e $environment -d ../DynamicEndpointURI
