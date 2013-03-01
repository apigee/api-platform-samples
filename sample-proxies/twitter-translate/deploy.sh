#!/bin/bash

source ../../setup/setenv.sh

echo "Enter your password for the Apigee Enterprise organization $org, followed by [ENTER]:"

read -s password

curl -X POST -H "Content-type:text/xml" -d @twitter-translate-cache.xml https://api.enterprise.apigee.com/v1/o/$org/environments/$env/caches -u $username:$password

echo Deploying $proxy to $env on $url using $username and $org

../../tools/deploy.py -n twitter-translate -u $username:$password -o $org -h $url -e $env -p / -d ../twitter-translate

echo "If 'State: deployed', then your API Proxy is ready to be invoked."

echo "Run 'invoke.sh'"
