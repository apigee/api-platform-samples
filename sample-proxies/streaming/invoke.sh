#!/bin/bash

echo Using org and environment configured in /setup/setenv.sh, $org and $env

source ../../setup/setenv.sh

curl http://$org-$env.$api_domain/streaming/forecastrss?"w=12797282"

# To pretty print JSON where python is available, uncomment the following command:

# curl http://$org-$env.apigee.net/xmltojson/forecastrss?"w=12797282" | python -mjson.tool
