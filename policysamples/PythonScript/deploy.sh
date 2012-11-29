#!/bin/bash

source ../setenv.sh

apiName=samples-python
basePath=/samples-python

##Cleanup
sh cleanup.sh

##Import and Deploy
../../tools/deploy.py -n $apiName -u $credentials -o $org -e $environment -d ../PythonScript
