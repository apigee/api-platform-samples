#!/bin/bash

echo Using org and environment configured in /setup/setenv.sh

source ../../setup/setenv.sh

set -x

# curl -H "routeTo:facebook" "http://$org-$env.apigee.net/conditional-routing/bla"

curl "http://$org-$env.apigee.net/conditional-routing/bla"