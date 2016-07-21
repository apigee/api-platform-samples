#!/bin/bash

## Ask the user for input.

source ../scripts/set_env.sh

printf "\nEnter your password for the Apigee Enterprise organization $org, followed by [ENTER]:\n"
read -s password

source ../scripts/verify_credentials.sh


## Call the API

printf "Now, we will call the API proxy with this curl command: curl -i http://$org-$env.$api_domain/v1/learn-edge\n\n"
printf "Hint: You will see a 200 HTTP status if the call succeeds.\n\n"
printf "Press return to execute the call: \n"
read
curl -i "http://$org-$env.$api_domain/v1/learn-edge"

