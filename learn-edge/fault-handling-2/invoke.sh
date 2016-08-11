#!/bin/bash

## Ask the user for input.

source ../scripts/set_env.sh

printf "\nEnter your password for the Apigee Enterprise organization $org, followed by [ENTER]:\n"
read -s password

source ../scripts/verify_credentials.sh
source ../scripts/verify_provisioning.sh


## Use the Edge Management API to get the API key.

printf "\nGet API key (the Consumer Key) from the Learn Edge App. Press Return to continue: \n"
read

key=`curl -u $username:$password $url/v1/o/$org/developers/learn-edge-developer@example.com/apps/learn-edge-app 2>/dev/null \
     | grep consumerKey | awk -F '\"' '{ print $4 }'`


printf "\nThe API key (Consumer Key) for the Learn Edge App is $key\n"


## Call the API with a valid API key and no other query parameters -- no error is thrown.

printf "\nCall the API with a valid key and no other query params -- no error is thrown. Press Return to contine:\n"
read

printf "\ncurl http://$org-$env.$api_domain/v1/learn-edge/json?apikey=$key\n\nResponse:\n"

curl -i "http://$org-$env.$api_domain/v1/learn-edge/json?apikey=$key"



## Call the API with three query parameters A, B, and C. 

printf "\n\nCall the API with query parameters A, B, and C to trigger an error on the PROXY REQUEST FLOW. Press Return to continue:\n"
read

printf "\ncurl http://$org-$env.$api_domain/v1/learn-edge/json?A=true&B=true&C=true&apikey=$key\n\nResponse:\n"


curl -i "http://$org-$env.$api_domain/v1/learn-edge/json?A=true&B=true&C=true&apikey=$key"

printf "\n\n** We triggered an error. The LAST Fault Rule in the chain that evaluates to TRUE executes! Triggered by query param C."


## Call the API with three query parameters X, Y, and Z. 

printf "\n\nCall the API with query parameters X, Y, and Z to trigger an error on the TARGET RESPONSE FLOW. Press Return to continue:\n"
read

printf "\ncurl http://$org-$env.$api_domain/v1/learn-edge/json?X=true&Y=true&Z=true&apikey=$key\n\nResponse:\n"


curl -i "http://$org-$env.$api_domain/v1/learn-edge/json?X=true&Y=true&Z=true&apikey=$key"

printf "\n\n** We triggered an error. The FIRST Fault Rule in the chain that evaluates to TRUE executes! Triggered by query param X."





