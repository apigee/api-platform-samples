#!/bin/bash

echo Using org and environment configured in /setup/setenv.sh

echo Be sure to run scripts under ./setup/provisioning

source ../../setup/setenv.sh

echo Get app profile

echo "Enter your password for the Apigee Enterprise organization $org, followed by [ENTER]:"

read -s password

echo -e "\nFetching consumer key and secret for joe-app"
ks=`curl -u "$username:$password" "$url/v1/o/$org/developers/joe@weathersample.com/apps/joe-app" 2>/dev/null | egrep "consumer(Key|Secret)"`
key=`echo $ks | awk -F '\"' '{ print $4 }'`
secret=`echo $ks | awk -F '\"' '{ print $8 }'`

echo -e "\nRequesting access token \n"

echo -e "curl -k -u \"$key:$secret\" https://$org-$env.$api_domain/weatheroauth/accesstoken?grant_type=client_credentials \n"

accesstoken_response=`curl -k -u "$key:$secret" "https://$org-$env.$api_domain/weatheroauth/accesstoken?grant_type=client_credentials" 2>/dev/null`

echo -e "AccessToken Response: \n $accesstoken_response"
