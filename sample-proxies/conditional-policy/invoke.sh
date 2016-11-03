#!/bin/bash

echo Using org and environment configured in /setup/setenv.sh

source ../../setup/setenv.sh

set -x

echo Pass header as true:

curl -i -H "responsetime:true" "http://$org-$env.$api_domain/v1/timer"

echo Now pass header as false:

curl -i -H "responsetime:false" "http://$org-$env.$api_domain/v1/timer"
