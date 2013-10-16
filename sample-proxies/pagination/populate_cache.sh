#!/bin/bash


source ../../setup/setenv.sh
echo "Enter your password for the Apigee Enterprise organization $org, followed by [ENTER]:"

read -s password

curl -H "Content-type:text/xml" -X POST  -d @paginate-cache.xml  https://api.enterprise.apigee.com/v1/o/${org}/environments/${env}/caches \
			  -u ${username}:${password}
