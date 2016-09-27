#!/bin/bash

## Ask the user for input.

source ../scripts/verify_provisioning.sh
source ../../setup/userconf.sh || exit 1
get_password || exit 1


## Use the Edge Management API to get the API key.

printf "\nGet API key (the Consumer Key) from the Learn Edge App. Press Return to continue: \n"
read

key=`curl -u $username:$password $url/v1/o/$org/developers/learn-edge-developer@example.com/apps/learn-edge-app 2>/dev/null \
     | grep consumerKey | awk -F '\"' '{ print $4 }'`

printf "\nThe API key (Consumer Key) for the Learn Edge App is $key\n"


## Call the API

printf "\nEnter the number of times you want to call the API in a row (Default: 15). Press Return to contine:\n"
read CALL_COUNTER

if [ -z $CALL_COUNTER ]; then
  CALL_COUNTER=15
fi

printf "\ncurl http://$org-$env.$api_domain/v1/learn-edge/json?apikey=$key\n\nResponse:\n"

while [ $CALL_COUNTER -ge 0 ]
do
  printf "\n\nAPI Call Number: $CALL_COUNTER \n\n"
	curl -i "http://$org-$env.$api_domain/v1/learn-edge/json?apikey=$key"
	printf "\n"
  ((CALL_COUNTER--))
  sleep 1
done









