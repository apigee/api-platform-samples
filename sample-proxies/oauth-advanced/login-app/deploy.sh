#!/bin/bash

source ../../../setup/setenv.sh

hash apigeetool &> /dev/null
if [ $? -eq 1 ]; then
    echo >&2 "You need to install apigeetool."
    echo >&2 "See https://www.npmjs.org/package/apigeetool for installation instructions."
    exit
fi

printf "\nEnter your password for the Apigee Enterprise organization $org, followed by [ENTER]:\n"

read -s password

printf "\nDeploying login-app to:\n Env: $env \n Org: $org \n Url: $url \n For: $username\n"
apigeetool deployproxy -u $username -p $password -o $org -e $env -n login-app -d . -U
