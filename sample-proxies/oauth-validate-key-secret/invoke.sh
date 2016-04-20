#!/bin/bash

echo Using org and environment configured in /setup/setenv.sh, $org and $env

echo "Enter a Base64 encoded client ID and client secret for a developer app associated with this proxy:"
read basic

source ../../setup/setenv.sh
echo "Basic: " $basic
 
curl https://$org-$env.$api_domain/oauth-validate-key-secret/token -H "Authorization: Basic $basic" -d 'grant_type=password&username=apigeeuser&password=Apigee123' -H 'Content-Type: application/x-www-form-urlencoded'

