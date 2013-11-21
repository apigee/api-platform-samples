#!/bin/bash

source ./setenv.sh

echo "Enter directory name for sample proxy to be deployed, followed by [ENTER]:"

read proxy

echo "Enter your password for the Apigee Enterprise organization $org, followed by [ENTER]:"

read -s password

echo Deploying $proxy to $env on $url using $username and $org

../tools/deploy.py -n $proxy -u $username:$password -o $org -h $url -e $env -p / -d ../sample-proxies/$proxy -h $url

echo "If 'State: deployed', then your API Proxy is ready to be invoked."

echo "Change directory to the sample API proxy deployed, and run 'invoke.sh'"

./provisioning_for_oauth.sh $proxy
