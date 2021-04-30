#!/bin/bash

echo Using org and environment configured in /setup/setenv.sh, $org and $env

source ../../setup/setenv.sh
echo "Making Options request"
curl -X OPTIONS -H "X-Custom-CORS:test" http://$org-$env.apigee.net/v1/cors/content-listing
echo "Making request with header"
curl  -H "X-Custom-CORS:Valid Cors" http://$org-$env.apigee.net/v1/cors/content-listing
echo ""
