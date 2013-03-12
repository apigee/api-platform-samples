#!/bin/bash

source ./setenv.sh

echo This script deploys all sample API proxies under ./sample-proxies to your organization on the Apigee API Platform.

echo Be sure to populate values in setenv.sh in this directory before running this script.

echo Using $username in $org.

echo "Enter your password for the Apigee Enterprise organization $org, followed by [ENTER]:"

read -s password

echo Deploying all samples to $env using $username and $org

../tools/deploy.py -n apikey -u $username:$password -o $org -e $env -p / -d ../sample-proxies/apikey

../tools/deploy.py -n conditional-policy -u $username:$password -o $org -e $env -p / -d ../sample-proxies/conditional-policy

../tools/deploy.py -n conditional-routing -u $username:$password -o $org -e $env -p / -d ../sample-proxies/conditional-routing

../tools/deploy.py -n dynamic-endpoint -u $username:$password -o $org -e $env -p / -d ../sample-proxies/dynamic-endpoint

../tools/deploy.py -n javascript-mashup -u $username:$password -o $org -e $env -p / -d ../sample-proxies/javascript-mashup

../tools/deploy.py -n oauth-authcode -u $username:$password -o $org -e $env -p / -d ../sample-proxies/oauth-authcode

../tools/deploy.py -n oauth-login-app -u $username:$password -o $org -e $env -p / -d ../sample-proxies/oauth-login-app

../tools/deploy.py -n oauth-client-credentials -u $username:$password -o $org -e $env -p / -d ../sample-proxies/oauth-client-credentials

../tools/deploy.py -n policy-mashup -u $username:$password -o $org -e $env -p / -d ../sample-proxies/policy-mashup

../tools/deploy.py -n simple-javascript -u $username:$password -o $org -e $env -p / -d ../sample-proxies/simple-javascript

../tools/deploy.py -n simple-python -u $username:$password -o $org -e $env -p / -d ../sample-proxies/simple-python

../tools/deploy.py -n soap -u $username:$password -o $org -e $env -p / -d ../sample-proxies/soap

../tools/deploy.py -n twitter-mobile-timeline -u $username:$password -o $org -e $env -p / -d ../sample-proxies/twitter-mobile-timeline

../tools/deploy.py -n twitter-oembed -u $username:$password -o $org -e $env -p / -d ../sample-proxies/twitter-oembed

../tools/deploy.py -n twitter-translate -u $username:$password -o $org -e $env -p / -d ../sample-proxies/twitter-translate

../tools/deploy.py -n xmltojson -u $username:$password -o $org -e $env -p / -d ../sample-proxies/xmltojson

echo "Deployment complete. Sample API proxies are deployed to the $env environment in the organization $org"

echo "Login to enterprise.apigee.com to view and interact with the sample API proxies"

echo "To invoke the samples, run invoke.sh found in each sample's directory in this distribution."

sh provisioning_for_oauth.sh apikey,oauth-authcode,oauth-client-credentials,oauth-verify-accesstoken,oauth-login-app
