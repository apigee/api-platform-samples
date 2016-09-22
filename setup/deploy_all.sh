#!/bin/bash

source ./userconf.sh

echo This script deploys all sample API proxies under ./sample-proxies to your organization on the Apigee API Platform.

echo Using $username in $org.

get_password

echo Deploying all samples to $env using $username and $org

echo Creating caches

curl -X POST -H "Content-type:text/xml" -d @../sample-proxies/outbound-oauth/oauth-token-cache.xml https://api.enterprise.apigee.com/v1/o/$org/environments/$env/caches -u $username:$password

curl -X POST -H "Content-type:text/xml" -d @../sample-proxies/pagination/paginationCache.xml https://api.enterprise.apigee.com/v1/o/$org/environments/$env/caches -u $username:$password

cd ../doc-samples/

for proxydir in *; do
    if [ -d "${proxydir}" ]; then
        ../tools/deploy.py -n $proxydir -u $username:$password -o $org -e $env -p / -d $proxydir -h $url
    fi
done

cd ../sample-proxies/

for proxydir in *; do
    if [ -d "${proxydir}" ]; then
        ../tools/deploy.py -n $proxydir -u $username:$password -o $org -e $env -p / -d $proxydir -h $url
    fi
done

cd ../setup/

echo "Deployment complete. Sample API proxies are deployed to the $env environment in the organization $org"

echo "Login to enterprise.apigee.com to view and interact with the sample API proxies"

echo "To invoke the samples, run invoke.sh found in each sample's directory in this distribution."

./provisioning_for_oauth.sh apikey,oauth-authcode,oauth-client-credentials,oauth-verify-accesstoken,oauth-login-app
