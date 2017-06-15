#!/bin/bash

echo Using org and environment configured in /setup/setenv.sh

source ../../setup/setenv.sh

#curl http://$org-$env.$api_domain/java-error -H "username:Will"
curl -v http://$org-$env.$api_domain/java-error 




