#!/bin/bash

## Ask the user for input.

source ../scripts/verify_provisioning.sh
source ../../setup/userconf.sh || exit 1
get_password || exit 1



## Use the Edge Management API to get the API key.

printf "\nGet API key (the Consumer Key) from the Learn Edge App. Press Return to continue: \n"
read

key=`curl -u $username:$password $url/v1/o/$org/developers/learn-edge-developer@example.com/apps/learn-edge-app 2>/dev/null \
     | grep consumerKey | awk -F '\"' '{ print $4 }'`


printf "\nThe API key (Consumer Key) for the Learn Edge App is $key\n"


## Send the directions payload

printf "\nCall the API and notice that the directions information is returned in an XML response. Press Return to contine:\n"
read

printf "\ncurl -i -d @directions_body.xml -H "Content-Type: application/xml" http://$org-$env.$api_domain/v1/learn-edge/directions?apikey=$key\n\nResponse:\n"

curl -i -d @directions_body.xml -H "Content-Type: application/xml" "http://$org-$env.$api_domain/v1/learn-edge/directions?apikey=$key"
printf "\n"


## Send the company info payload

printf "\nCall the API and notice that the company ID is returned in an XML response. Press Return to contine:\n"
read

printf "\ncurl -i -d @company_info_body.xml -H "Content-Type: application/xml" http://$org-$env.$api_domain/v1/learn-edge/companyId?apikey=$key\n\nResponse:\n"

curl -i -d @company_info_body.xml -H "Content-Type: application/xml" "http://$org-$env.$api_domain/v1/learn-edge/companyId?apikey=$key"
printf "\n"


