#!/bin/bash

echo Using org and environment configured in /setup/setenv.sh

source ../../setup/setenv.sh

curl http://$org-$env.apigee.net/java-cookbook/forecastrss?"city=venice" 

