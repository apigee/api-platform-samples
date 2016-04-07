#!/bin/bash
source ../../setup/setenv.sh

echo -e "\nCalling the helloworld target"
echo -e "\nCalling: curl http://$org-$env.$api_domain/v0/hello

curl http://$org-$env.$api_domain/v0/hello

echo -e "\nCalling the iloveapis target"
echo -e "\nCalling: curl http://$org-$env.$api_domain/v0/hello/iloveapis

curl http://$org-$env.$api_domain/v0/hello/iloveapis

