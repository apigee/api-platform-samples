#!/bin/bash

echo Using org and environment configured in /setup/setenv.sh

source ../../../setup/setenv.sh

echo "Enter or cut/paste the consumer key for your Apigee Edge application, followed by [ENTER]:"

read -s appkey

echo "Enter or cut/paste the shared secret for your Apigee Edge application, followed by [ENTER]:"

read -s appsecret

echo Generate a token using the client credentials grant type

curl -v -X POST -H "Content-Type: application/json" -d '{ "grant_type":"client_credentials" }' \
     -u $appkey:$appsecret "http://$org-$env.$api_domain/v1/datastore/token"

echo Generate a token using the password grant type

echo "Enter a user name present in your Advanced API Services app's /users collection, followed by [ENTER]:"

read -s uguser

echo "Enter the password for the user provided above, followed by [ENTER]:"

read -s ugpass

payload='{ "grant_type":"password","username":"'
payload+=$uguser
payload+='","password":"'
payload+=$ugpass
payload+='" }'

echo $payload

curl -v -X POST -H "Content-Type: application/json" \
     -d "$payload" \
     -u $appkey:$appsecret "http://$org-$env.$api_domain/v1/datastore/token"
