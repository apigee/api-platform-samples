#!/bin/bash

printf "\nDid you enter your Edge configuration information in ../../setup/setenv.sh? [y/n]: "
read setenv

if [ -z $setenv ] || [ "$setenv" = "y" ]; then
  source ../../setup/setenv.sh
else
  printf "\nYou must configure this file before continuing. See the README for details. Press Return to exit."
  read
  exit
fi

printf "\nEnter a query parameter value to test. For example: delete \n\n"
read queryparam 

proxy_response=`curl -s -i -X GET "http://$org-$env.$api_domain/regex-protection?query=$queryparam"`

printf "\nAPI call: \n"
printf  "\n    curl -s -i -X GET \"http://$org-$env.$api_domain/regex-protection?query=$queryparam\" \n"

printf  "\nProxy Response: \n\n    $proxy_response \n\n"


