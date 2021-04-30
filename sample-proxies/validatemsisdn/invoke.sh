#!/bin/bash

echo Using org and environment configured in /setup/setenv.sh

source ../../setup/setenv.sh

echo "Checking Valid Phone Number"

curl  "http://$org-$env.apigee.net/validatemsisdn/+41/+41446681800" 

echo "Checking Invalid Phone Number"
curl  "http://$org-$env.apigee.net/validatemsisdn/+91/+91456565779" 

