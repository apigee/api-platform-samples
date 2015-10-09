#!/bin/sh

source ../../../setup/setenv.sh

echo "Enter your password for the Apigee Enterprise organization, followed by [ENTER]:"

read -s password

echo using $username and $org

echo "Deleting Apps"

curl -u $username:$password $url/v1/o/$org/developers/webdev@example.com/apps/webserver-app -X DELETE

echo "Deleting Developers"

curl -u $username:$password $url/v1/o/$org/developers/webdev@example.com -X DELETE

echo "Deleting Products"

curl -u $username:$password $url/v1/o/$org/apiproducts/webserver-product -X DELETE


echo "\nCleanup Completed\n"
