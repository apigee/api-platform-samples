#!/bin/bash

source ../setenv.sh

apiName=samples-conditional-policy
basePath=/condition

##Cleanup

sh cleanup.sh

##Import and Deploy
../../tools/deploy.py -n $apiName -u $credentials -o $org -e $environment -d ../ConditionalRouting
