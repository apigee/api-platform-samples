#!/bin/bash

printf "\nDid you enter your Edge configuration information in ../../setup/setenv.sh? [y/n]: "
read setenv

if [ -z $setenv ] || [ "$setenv" = "y" ]; then
  printf ""
else  
  printf "\nYou must configure this file before continuing. See the README for details. Press Return to exit."
  read
  exit
fi


printf "\nDid you run the provisioning script ../../setup/provisioning/setup.sh? [y/n]: "
read setup

if [ -z $setup ] || [ "$setup" = "y" ]; then
  printf ""
else  
  printf "\nYou must run this script before continuing. See the README for details. Press Return to exit."
  read
  exit
fi

source ../../setup/setenv.sh

printf "\nEnter your password for the Apigee Enterprise organization $org, followed by [ENTER]: " 

read -s password



printf  "\n\nFetching consumer key and secret for Josiah's Weather App from Apigee Edge..."
ks=`curl -u "$username:$password" "$url/v1/o/$org/developers/joe@weathersample.com/apps/joe-app" 2>/dev/null | egrep "consumer(Key|Secret)"`
key=`echo $ks | awk -F '\"' '{ print $4 }'`
secret=`echo $ks | awk -F '\"' '{ print $8 }'`


printf "\nRetrieved key: $key"
printf "\nRetrieved secret: $secret\n"

printf "\n\nBase64 encrypt the key:secret values for the Basic Auth header: "

auth=`echo -n $key:$secret | base64`

printf "\nBasic: $auth"

printf  "\n\nRequest the access token using the retrieved keys... \n"
 

accesstoken_response=`curl -X POST -H 'Content-Type: application/x-www-form-urlencoded' -H "Authorization: Basic $auth" "https://$org-$env.$api_domain/oauth-validate-key-secret/token" -d 'grant_type=password&username=apigeeuser&password=Apigee123'`

printf  "curl -X POST -H 'Content-Type: application/x-www-form-urlencoded' -H \"Authorization: Basic $auth\"           \"https://$org-$env.$api_domain/oauth-validate-key-secret/token -d grant_type=password&username=apigeeuser&password=Apigee123\" \n"

printf  "\nAccessToken Response: \n\n $accesstoken_response \n"


