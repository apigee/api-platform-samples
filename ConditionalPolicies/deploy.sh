#!/bin/bash

source setenv.sh

apiName=samples-conditional-policy
basePath=/condition

./cleanup.sh

../tools/deploy.py -n samples-conditional-policy -u $credentials -o $org -e $environment -d ../ConditionalPolicies
