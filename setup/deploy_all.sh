#!/bin/bash

source ./setenv.sh

echo This script deploys all sample API proxies under ./sample-proxies to your organization on the Apigee API Platform.

echo Be sure to populate values in setenv.sh in this directory before running this script.

echo Using $username in $org.

echo "Enter your password for the Apigee Enterprise organization $org, followed by [ENTER]:"

read -s password

echo Deploying all samples to $env using $username and $org

cd ../sample-proxies/

for proxydir in *; do
    if [ -d "${proxydir}" ]; then
        ../tools/deploy.py -n $proxydir -u $username:$password -o $org -e $env -p / -d $proxydir
    fi
done

cd ../setup/

echo "Deployment complete. Sample API proxies are deployed to the $env environment in the organization $org"

echo "Login to enterprise.apigee.com to view and interact with the sample API proxies"

echo "To invoke the samples, run invoke.sh found in each sample's directory in this distribution."

./provisioning_for_oauth.sh apikey,oauth-authcode,oauth-client-credentials,oauth-verify-accesstoken,oauth-login-app
