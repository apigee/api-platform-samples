#!/bin/sh

source ../../setup/setenv.sh

echo "Enter your password for the Apigee Enterprise organization, followed by [ENTER]:"

read -s password

echo using $username and $org

echo "Deleting Apps"

curl -u $username:$password $url/v1/o/$org/developers/learn-edge-developer@example.com/apps/learn-edge-app -X DELETE

echo "Deleting Developers"

curl -u $username:$password $url/v1/o/$org/developers/learn-edge-developer@example.com -X DELETE


echo "Deleting Products"

curl -u $username:$password $url/v1/o/$org/apiproducts/LearnEdgeProduct -X DELETE

echo "\nCleanup Completed\n"
