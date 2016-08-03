#!/bin/bash

echo Using org and environment configured in /setup/setenv.sh

source ../../setup/setenv.sh

set -x

curl -i -H "responsetime:true" "http://$org-$env.$api_domain/timer/json"