#!/bin/bash

echo Using org and environment configured in /setup/setenv.sh

source ../../setup/setenv.sh

echo "Invoking a simple Node.js proxy."

set -x

curl  -v "http://$org-$env.$api_domain/nodejs-hello" 
