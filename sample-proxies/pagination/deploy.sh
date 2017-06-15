#!/bin/bash

source ../../setup/setenv.sh

echo "Enter your password for the Apigee Enterprise organization $org, followed by [ENTER]:"

read -s password

curl -X POST -H "Content-type:text/xml" -d @paginationCache.xml https://api.enterprise.apigee.com/v1/o/$org/environments/$env/caches -u $username:$password

echo Deploying $proxy to $env on $url using $username and $org

../../tools/deploy.py -n pagination -u $username:$password -o $org -h $url -e $env -p / -d ../pagination
../../tools/deploy.py -n restaurant_locator -u $username:$password -o $org -h $url -e $env -p / -d ./restaurant_locator_target

echo "If 'State: deployed', then your API Proxy is ready to be invoked."

echo "Run 'invoke.sh'"
