#!/bin/bash

source ../../setup/setenv.sh

echo "Enter your password for the Apigee Enterprise organization $org, followed by [ENTER]:"

read -s password

echo Deploying $proxy to $env on $url using $username and $org

set -x

../../tools/deploy.py -n publisherz -u $username:$password -o $org -h $url -e $env -p / -d publisherz-proxy

echo "If 'State: deployed', then your API Proxy is ready to be invoked."

echo "Once the API proxy is deployed successfully, modify the URL in the sample mobile app to point at the proxied URL."

echo "The new URL is http://{your_org}-test.apigee.net/publisherz"