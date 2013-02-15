#!/bin/bash

echo Using org and environment configured in /setup/setenv.sh

source ../setup/setenv.sh

echo "Invoking proxied API http://weather.yahooapis.com/forecastrss?w=12797282"

set -x

curl "http://$org-$env.apigee.net/weather/forecastrss?w=12797282"