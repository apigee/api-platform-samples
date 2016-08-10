#!/bin/bash

## Ask the user for input.

source ../scripts/set_env.sh


## Call the API

printf "\nCalling API: curl -i http://$org-$env.$api_domain/v1/learn-edge: \n\n"
printf "\nHint: On success, the API returns the message 'Hello, Guest' from the target service.\n\n"
printf "\nPress return to make the call: \n\n"
read
curl -i "http://$org-$env.$api_domain/v1/learn-edge/"

printf "\n"

