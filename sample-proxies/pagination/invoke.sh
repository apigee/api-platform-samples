 v#!/bin/bash

echo Using org and environment configured in /setup/setenv.sh

source ../../setup/setenv.sh

echo "Enter your password for the Apigee Enterprise organization, followed by [ENTER]:"

read -s password

set -x

curl -H "user_id : tester1" -H "bypass-cache : true" "http://$org-$env.apigee.net/v1/paginate/content-listing?offset=0&limit=20"

echo Now use without query parameter

curl -H "user_id : tester1" -H "bypass-cache : false" "http://$org-$env.apigee.net/v1/paginate/content-listing"

