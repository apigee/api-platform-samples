#!/bin/bash

echo Using org and environment configured in /setup/setenv.sh, $org and $env

source ../../setup/setenv.sh

# curl http://$org-$env.apigee.net/xmltojson/forecastrss?"w=12797282" | python -mjson.tool

curl http://$org-$env.apigee.net/xmltojson/forecastrss?"w=12797282" | xmllint --format