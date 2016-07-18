#!/bin/bash

printf "\nUsing org and environment configured in /setup/setenv.sh \n"

source ../../setup/setenv.sh

printf "\nCalling API: curl -i http://$org-$env.$api_domain/learn-edge: \n\n"
printf "\nHint: On success, the API returns the message 'Hello, Guest' from the target service.\n\n"
printf "\nPress return to make the call: \n\n"
read
curl -i "http://$org-$env.$api_domain/learn-edge/"

printf "\n"

