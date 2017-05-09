#!/bin/bash

echo Using org and environment configured in /setup/setenv.sh

source ../../setup/setenv.sh

curl -v http://$org-$env.$api_domain/java-cookbook/json

