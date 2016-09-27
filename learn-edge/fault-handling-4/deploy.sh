#!/bin/bash

# Ask the user for input.

source ../scripts/set_env.sh
source ../scripts/deploy_proxy.sh

printf "\nEnter your password for the Apigee Enterprise organization $org, followed by [ENTER]:\n"
read -s password

source ../scripts/verify_credentials.sh

## Deploy the proxy using apigeetool.

deploy_proxy

## All done.
