#!/bin/bash

source ../setenv.sh

apiName=samples-javacallout
basePath=samples-javacallout

##Cleanup
sh cleanup.sh

##Import and Deploy
../../tools/deploy.py -n $apiName -u $credentials -o $org -e $environment -d ../JavaCalloutSample