#!/bin/bash

## Ask the user for input.

source ../scripts/set_env.sh

printf "\nEnter your password for the Apigee Enterprise organization $org, followed by [ENTER]:\n"
read -s password

source ../scripts/verify_credentials.sh
source ../scripts/verify_provisioning.sh


## Use the Edge Management API to get the API key.

printf "\nGet API key (the Consumer Key) from the Learn Edge App. Press Return to continue: \n"
read

key=`curl -u $username:$password $url/v1/o/$org/developers/learn-edge-developer@example.com/apps/learn-edge-app 2>/dev/null \
     | grep consumerKey | awk -F '\"' '{ print $4 }'`


printf "\nThe API key (Consumer Key) for the Learn Edge App is $key\n"


## Call the API

printf "\nCall the API with a valid API key. Press Return to contine:\n"
read

printf "\ncurl http://$org-$env.$api_domain/v1/learn-edge/json?apikey=$key\n\nResponse:\n"

curl "http://$org-$env.$api_domain/v1/learn-edge/json?apikey=$key"


## Call the API

printf "\n\nCall the API with a bad API key. This causes the proxy to go into the ERROR FLOW. The LAST fault rule that evalutes to true executes: that is the INVALID KEY rule. Press Return to continue:\n"
read

printf "\ncurl http://$org-$env.$api_domain/v1/learn-edge/json?apikey=ZZZZZZZZZZZZZZZZZZZZ\n\nResponse:\n"


curl -i "http://$org-$env.$api_domain/v1/learn-edge/json?apikey=ZZZZZZZZZZZZZZZZZZZZ"

printf "\nThis is the custom error message defined in the AssignMessage policy. Also note the status was set to 400. "


## Call the API

printf "\n\nCall the API with a bad API key. This causes the proxy to go into the ERROR FLOW. Now see what happens when the other query params are set. Press Return to continue:\n"
read

printf "\ncurl http://$org-$env.$api_domain/v1/learn-edge/json?bad-param-A=true&bad-param-B=true&bad-param-C=true&apikey=ZZZZZZZZZZZZZZZZZZZZ\n\nResponse:\n"


curl -i "http://$org-$env.$api_domain/v1/learn-edge/json?bad-param-A=true&bad-param-B=true&bad-param-C=true&apikey=ZZZZZZZZZZZZZZZZZZZZ"

printf "\nThe LAST Fault Rule that evaluates to TRUE executes -- That is bad-param-C. "

## Call the API

printf "\n\nCall the API with a bad API key. This causes the proxy to go into the ERROR FLOW. Now see what happens when the other query params are set. Press Return to continue:\n"
read

printf "\ncurl http://$org-$env.$api_domain/v1/learn-edge/json?bad-param-A=false&bad-param-B=true&bad-param-C=false&apikey=ZZZZZZZZZZZZZZZZZZZZ\n\nResponse:\n"


curl -i "http://$org-$env.$api_domain/v1/learn-edge/json?bad-param-A=false&bad-param-B=true&bad-param-C=false&apikey=ZZZZZZZZZZZZZZZZZZZZ"

printf "\nThe LAST Fault Rule that evaluates to TRUE executes -- That is bad-param-B. "


## Call the API

printf "\n\nCall the API with a bad API key. This causes the proxy to go into the ERROR FLOW. Now see what happens when the other query params are set. Press Return to continue:\n"
read

printf "\ncurl http://$org-$env.$api_domain/v1/learn-edge/json?bad-param-A=true&bad-param-B=false&bad-param-C=false&apikey=ZZZZZZZZZZZZZZZZZZZZ\n\nResponse:\n"


curl -i "http://$org-$env.$api_domain/v1/learn-edge/json?bad-param-A=true&bad-param-B=false&bad-param-C=false&apikey=ZZZZZZZZZZZZZZZZZZZZ"

printf "\nThe LAST Fault Rule that evaluates to TRUE executes -- That is bad-param-A. \n\n"




