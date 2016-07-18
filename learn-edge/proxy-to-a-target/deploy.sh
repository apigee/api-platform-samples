#!/bin/bash

source ../../setup/setenv.sh

echo "Enter your password for the Apigee Enterprise organization $org, followed by [ENTER]:"

read -s password

echo Verifying credentials...

response=`curl -s -o /dev/null -I -w "%{http_code}" https://api.enterprise.apigee.com/v1/organizations/$org -u $username:$password`

if [ $response -eq 401 ]
then
  echo "Authentication failed!"
  echo "Please re-run the script using the right username/password."
  exit
elif [ $response -eq 403 ]
then
  echo Organization $org is invalid!
  echo Please re-run the script using the right org.
  exit
else
  echo "Verfied! Proceeding with deployment."
fi;

echo Deploying $proxy to $env on $url using $username and $org

../../tools/deploy.py -n learn-edge -u $username:$password -o $org -h $url -e $env -p / -d ../proxy-to-a-target

echo "If 'State: deployed', then your API Proxy is ready to be invoked."

echo "Run 'invoke.sh'"

