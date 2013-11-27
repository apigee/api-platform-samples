#!/bin/bash

source ../../setup/setenv.sh

echo "Enter your password for the Apigee Enterprise organization $org, followed by [ENTER]:"

read -s password

echo Creating cache

curl -X POST -H "Content-type:text/xml" -d @oauth-token-cache.xml https://api.enterprise.apigee.com/v1/o/$org/environments/$env/caches -u $username:$password

echo Deploying $proxy to $env on $url using $username and $org

../../tools/deploy.py -n outbound-oauth -u $username:$password -o $org -h $url -e $env -p / -d ../outbound-oauth

echo "If 'State: deployed', then your API Proxy is ready to be invoked."

echo "Run 'invoke.sh'"