#!/bin/bash

source ../../setup/setenv.sh

echo -e "Calling http://$org-$env.$api_domain/parse-request-url/extract-variablels/resource1/123456"
curl "http://$org-$env.$api_domain/parse-request-url/extract-variables/resource1/123456" 
echo -e "\n\nCalling http://$org-$env.$api_domain/parse-request-url/extract-variables?code=abc123"
curl "http://$org-$env.$api_domain/parse-request-url/extract-variables?code=DBNabc123" 


