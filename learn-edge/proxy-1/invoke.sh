#!/bin/bash

printf "\nDid you enter your Edge configuration information in ../../setup/setenv.sh? [y/n]: "
read setenv

if [ -z $setenv ] || [ "$setenv" = "y" ]; then
  printf ""
else  
  printf "\nYou must configure this file before continuing. See the README for details. Press Return to exit."
  read
  exit
fi

source ../../setup/setenv.sh

printf "curl -i http://$org-$env.$api_domain/learn-edge"
curl -i "http://$org-$env.$api_domain/learn-edge"

