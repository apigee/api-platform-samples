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

printf "\nEnter the path suffix you want to test. For example: /cat \n\n"
read pathsuffix

proxy_response=`curl -s -X GET "http://$org-$env.$api_domain/matchtest$pathsuffix"`

printf "\nAPI call: \n"
printf  "\n    curl -s -X GET \"http://$org-$env.$api_domain/matchtest$pathsuffix\" \n"

printf  "\nProxy Response: \n\n    $proxy_response \n\n"


