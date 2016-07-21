#!/bin/bash

printf "\nDid you enter your Edge configuration information in api-platform-samples/setup/setenv.sh? [y/n](y): "
read setenv

if [ -z $setenv ] || [ "$setenv" = "y" ]; then

  source ../../setup/setenv.sh
else  
  printf "\nYou must configure this file before continuing. See the README for details. Press Return to exit."
  read
  exit
fi
