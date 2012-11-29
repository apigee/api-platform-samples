#!/bin/bash

source ../setenv.sh

apiName=samples-javascript
basePath=/samples-javascript

##Cleanup
sh cleanup.sh

##Import and Deploy
../../tools/deploy.py -n $apiName -u $credentials -o $org -e $environment -d ../JavaScript