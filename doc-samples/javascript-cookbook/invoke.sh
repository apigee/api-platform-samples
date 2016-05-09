#!/bin/bash

echo Using org and environment configured in /setup/setenv.sh

source ../../setup/setenv.sh

echo "Invoking proxied API http://mocktarget.apigee.net/xml"

set -x

curl  -v "http://$org-$env.$api_domain/javascript-cookbook/xml" 
