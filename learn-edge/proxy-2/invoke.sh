#!/bin/bash

printf "\nUsing org and environment configured in /setup/setenv.sh \n"

source ../../setup/setenv.sh

printf "\nCalling API: curl -i http://$org-$env.$api_domain/learn-edge \n\nResponse: \n\n"
curl -i "http://$org-$env.$api_domain/learn-edge/"

printf "\n"

