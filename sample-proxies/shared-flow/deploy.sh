#!/bin/bash

source ../../setup/setenv.sh

echo "Enter your password for the Apigee Enterprise organization $org, followed by [ENTER]:"

read -s password

echo Deploying $proxy to $env on $url using $username and $org

../../tools/deploy.py -n shared-flow-client-proxy -u $username:$password -o $org -h $url -e $env -p / -d ../shared-flow

../../tools/deploy-sharedflow.py -n verify-apikey-shared -u $username:$password -o $org -h $url -e $env -p / -d ../shared-flow

echo "If 'State: deployed', then your API proxy and shared flow are ready to be invoked."

echo "Run 'invoke.sh'"