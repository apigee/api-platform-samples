#!/bin/bash

source ../setenv.sh

apiName=samples-ratelimit
basePath=/samples-ratelimit

##Cleanup
sh cleanup.sh

##Import and Deploy
../../tools/deploy.py -n $apiName -u $credentials -o $org -e $environment -d ../RateLimit
