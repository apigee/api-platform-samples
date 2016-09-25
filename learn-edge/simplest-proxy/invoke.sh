#!/bin/bash

## Ask the user for input.

source ../../setup/userconf.sh || exit 1

## Call the API

printf "\n\nNow, we will call the API proxy with this curl command: curl -i http://$org-$env.$api_domain/v1/learn-edge\n\n"
printf "Hint: You will see a 200 HTTP status if the call succeeds.\n\n"
printf "Press return to execute the call: \n"
read
curl -i "http://$org-$env.$api_domain/v1/learn-edge"

