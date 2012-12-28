#!/bin/bash

source ./setenv.sh

echo "Enter directory name for sample proxy to be deployed, followed by [ENTER]:"

read proxy

echo "Enter your password for the Apigee Enterprise organization $org, followed by [ENTER]:"

read -s password

echo Deploying $proxy to $env using $username and $org

../tools/deploy.py -n $proxy -u $username:$password -o $org -e $env -p / -d ../sample-proxies/$proxy
