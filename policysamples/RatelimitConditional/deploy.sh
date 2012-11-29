#!/bin/bash

source ../setenv.sh

apiName=samples-ratelimitconditional
basePath=/samples-ratelimitconditional

##Cleanup
sh cleanup.sh

##Import and Deploy
../../tools/deploy.py -n $apiName -u $credentials -o $org -e $environment -d ../RateLimitConditional
