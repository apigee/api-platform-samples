#!/bin/bash
echo "Reading your account settings from /setup/setenv.sh"
source ../../setup/setenv.sh

echo "Enter your password for the Apigee Enterprise organization $org, followed by [ENTER]:"

read -s password

echo Deploying $proxy to $env on $url using $username and $org

../../tools/deploy.py -n oauth-login-app -u $username:$password -o $org -h $url -e $env -p / -d ../oauth-login-app

echo "If 'State: deployed', then your API Proxy is ready to be invoked."

echo "Run 'invoke.sh'"
