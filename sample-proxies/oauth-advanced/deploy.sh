#!/bin/bash

source ../../setup/setenv.sh

hash apigeetool &> /dev/null
if [ $? -eq 1 ]; then
    echo >&2 "You need to install apigeetool."
    echo >&2 "See https://www.npmjs.org/package/apigeetool for installation instructions."
    exit
fi

printf "\nEnter your password for the Apigee Enterprise organization $org, followed by [ENTER]:\n"

read -s password

printf "\nDeploying login-app to:\n Env: $env \n Org: $org \n Url: $url \n For: $username\n"
apigeetool deployproxy -u $username -p $password -o $org -e $env -n login-app -d ./login-app -R

printf "\nDeploying webserver-app to:\n Env: $env \n Org: $org \n Url: $url \n For: $username\n"
apigeetool deployproxy -u $username -p $password -o $org -e $env -n webserver-app -d ./webserver-app

printf "\nDeploying user-mgmt-v1 to:\n Env: $env \n Org: $org \n Url: $url \n For: $username\n"
apigeetool deployproxy -u $username -p $password -o $org -e $env -n user-mgmt-v1 -d ./user-mgmt-v1

printf "\nDeploying oauth2 to:\n Env: $env \n Org: $org \n Url: $url \n For: $username\n"
apigeetool deployproxy -u $username -p $password -o $org -e $env -n oauth2 -d ./oauth2 

printf "\nOpen a browser and go to: https://$org-$env.apigee.net/web\n"
