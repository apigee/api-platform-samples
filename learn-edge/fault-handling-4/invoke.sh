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


## Call the API with a valid API key.

printf "\nCall the API with a valid API key. Press Return to contine:\n"
read

printf "\ncurl http://$org-$env.$api_domain/v1/learn-edge/json?apikey=$key\n\nResponse:\n"

curl "http://$org-$env.$api_domain/v1/learn-edge/json?apikey=$key"


## Call the API with an invalid API key.

printf "\n\nCall the API with a bad API key. Press Return to continue:\n"
read

printf "\ncurl http://$org-$env.$api_domain/v1/learn-edge/json?apikey=ZZZZZZZZZZZZZZZZZZZZ\n\nResponse:\n" 


curl -i "http://$org-$env.$api_domain/v1/learn-edge/json?apikey=ZZZZZZZZZZZZZZZZZZZZ"

printf "\n"


## Call the API with a resource path that does not match the key.

printf "\n\nCall the API with a bad resource. Press Return to continue:\n"
read

printf "\ncurl http://$org-$env.$api_domain/v1/learn-edge/foobar?apikey=$key:\n"


curl -i "http://$org-$env.$api_domain/v1/learn-edge/foobar?apikey=$key"

printf "\n"


## Call the API without the API key query parameter.

printf "\n\nCall the API with the API key query parameter. Press Return to continue:\n"
read

printf "\ncurl http://$org-$env.$api_domain/v1/learn-edge/foobar?baz=$key:\n"


curl -i "http://$org-$env.$api_domain/v1/learn-edge/foobar?baz=$key"

printf "\n"
