#!/bin/bash

printf "\nDid you enter your Edge configuration information in ../../setup/setenv.sh? [y/n]:\n\n "
read setenv

if [ -z $setenv ] || [ "$setenv" = "y" ]; then
  printf ""
else  
  printf "\nYou must configure this file before continuing. See the README for details. Press Return to exit."
  read
  exit
fi

source ../../setup/setenv.sh

printf "Now, we will call the API proxy with this curl command: curl -i http://$org-$env.$api_domain/learn-edge\n\n"
printf "Hint: You will see a 200 HTTP status if the call succeeds.\n\n"
printf "Press return to execute the call: \n"
read
curl -i "http://$org-$env.$api_domain/learn-edge"

