#!/bin/bash


## Ask the user for input.

source ../scripts/set_env.sh

printf "\nEnter your password for the Apigee Enterprise organization $org, followed by [ENTER]:\n"
read -s password

source ../scripts/verify_credentials.sh
source ../scripts/verify_provisioning.sh



printf  "\n\nFetching consumer key and secret for Josiah's Weather App from Apigee Edge..."
ks=`curl -u "$username:$password" "$url/v1/o/$org/developers/learn-edge-developer@example.com/apps/learn-edge-app" 2>/dev/null | egrep "consumer(Key|Secret)"`
key=`echo $ks | awk -F '\"' '{ print $4 }'`
secret=`echo $ks | awk -F '\"' '{ print $8 }'`


printf "\nRetrieved key: $key"
printf "\nRetrieved secret: $secret\n"

printf "\n\nBase64 encrypt the key:secret values for the Basic Auth header: "

auth=`echo -n $key:$secret | base64`

printf "\nBasic: $auth"



printf  "\n\nRequest the access token using the retrieved keys. Press Return to continue: \n"
read

accesstoken_response=`curl -i -k -X POST -H  "Authorization: Basic $auth" "https://$org-$env.$api_domain/v1/learn-edge/token?grant_type=client_credentials" 2>/dev/null`

printf  "curl -k -X POST -H \"Authorization: Basic $auth\" \"https://$org-$env.$api_domain/v1/learn-edge/token?grant_type=client_credentials\" \n"

printf  "\nAccessToken Response: \n\n $accesstoken_response \n"

## All done.
