#!/bin/bash

echo Using org and environment configured in /setup/setenv.sh

source ../../setup/setenv.sh

echo "Enter your password for the Apigee Enterprise organization, followed by [ENTER]:"

read -s password

echo Get the app profile

curl -u $username:$password $url/v1/o/$org/developers/thomas@weathersample.com/apps/thomas-app

echo Get API key--aka consumer key--from app profile

key=`curl -u $username:$password $url/v1/o/$org/developers/thomas@weathersample.com/apps/thomas-app 2>/dev/null \
     | grep consumerKey | awk -F '\"' '{ print $4 }'`

echo "Consumer key is $key"

set -x

curl "http://$org-$env.$api_domain/shared-flow-client-proxy?apikey=$key"

echo Now use an invalid key

curl "http://$org-$env.$api_domain/shared-flow-client-proxy?apikey=ZZZZZZZZZZZZZZZZZZZZ"


