#!/bin/bash

echo Using org and environment configured in /setup/setenv.sh

source ../../setup/setenv.sh

curl -X POST -d @input.json "http://$org-$env.apigee.net/jsontoplist" 

