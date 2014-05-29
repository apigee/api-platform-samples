#!/bin/bash

echo Using org and environment configured in /setup/setenv.sh

source ../../setup/setenv.sh

set -x

curl "http://$org-$env.$api_domain/twitter-mobile-timeline/1/statuses/user_timeline.json?screen_name=Apigee"

# To pretty print JSON where python is available, uncomment the following command:

# curl "http://$org-$env.apigee.net/twitter-mobile-timeline/1/statuses/user_timeline.json?screen_name=Apigee" | python -mjson.tool
