#!/bin/bash

echo Using org and environment configured in /setup/setenv.sh

echo Be sure to run scripts under ./setup/provisioning

source ../../setup/setenv.sh

curl http://$org-$env.apigee.net/altitude?"country=us&postalcode=08008"

echo Get app profile

echo "Enter your password for the Apigee Enterprise organization $org, followed by [ENTER]:"

read -s password

curl $username:$password https://api.enterprise.apigee.com/v1/o/$org/apps/weatherapp

echo "Enter the app's consumer key, followed by [ENTER]:"

read key

echo "Enter the app's consumer secret, followed by [ENTER]:"

read secret

set -x

echo Request access token

curl -u $key:$secret http://$org-$env..apigee.net/weather/accesstoken?"grant_type=client_credentials"

echo Invoke API with access token

echo "Enter the access token, followed by [ENTER]:"

read token

curl -H "Authorization: Bearer $token" http://$org-$env.apigee.net/weather/forecastrss?"w=12797282"