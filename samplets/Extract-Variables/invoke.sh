#!/bin/bash

source ../../setup/setenv.sh

echo -e "\n\nAPI 1 of 2: http://$org-$env.$api_domain/extract-variables/resource1/123456"
read -p "Press Return to call this API..."
curl "http://$org-$env.$api_domain/extract-variables/resource1/123456" 
echo -e "\n\nAPI 2 of 2: http://$org-$env.$api_domain/extract-variables?code=abc123"
read -p "Press Return to call this API..."
curl "http://$org-$env.$api_domain/extract-variables?code=DBNabc123" 
echo -e "\n\n"


