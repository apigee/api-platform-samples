#!/bin/bash


source ../../setup/setenv.sh
echo -e "\nUsing organization $org and environment $env configured in ../../setup/setenv.sh \n"

#set -x

echo -e "\nPOST employee data to the back-end data store.\n"

curl http://$org-$env.apigee.net/employees/profile \
-H "Content-Type: application/json" \
-d '{"id":"ajones", "firstName":"Alice", "lastName":"Jones", "phone": "201-555-5555" }' \
-X POST


echo -e "\nFetch employee data from the back-end data store.\n"
curl "http://$org-$env.$api_domain/employees/profiles"
