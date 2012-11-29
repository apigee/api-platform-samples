#!/bin/bash

source ../setenv.sh

apiName=samples-contentrouting
basePath=/samples-contentrouting

##Cleanup
sh cleanup.sh

##Import and Deploy
../../tools/deploy.py -n $apiName -u $credentials -o $org -e $environment -d ../ContentRouting
