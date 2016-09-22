#!/bin/bash

## Ensure that user config vars have been set

source ../../setup/userconf.sh

## Call the API

printf "\n\nNow, we will call the API proxy with this curl command: curl -i http://$org-$env.$api_domain/v1/learn-edge\n\n"
printf "Hint: You will see a 200 HTTP status if the call succeeds.\n\n"
printf "Press return to execute the call: \n"
read
curl -i "http://$org-$env.$api_domain/v1/learn-edge"

