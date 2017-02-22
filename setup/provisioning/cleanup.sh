#!/bin/sh


## Ensure configuration variables have been set.
source ../userconf.sh || exit 1
get_password || exit 1

#source ./../setenv.sh
#echo "Enter your password for the Apigee Enterprise organization, followed by [ENTER]:"
#read -s password

echo using $username and $org

echo "Deleting Apps"

curl -u $username:$password $url/v1/o/$org/developers/thomas@weathersample.com/apps/thomas-app -X DELETE

curl -u $username:$password $url/v1/o/$org/developers/joe@weathersample.com/apps/joe-app -X DELETE

echo "Deleting Developers"

curl -u $username:$password $url/v1/o/$org/developers/thomas@weathersample.com -X DELETE

curl -u $username:$password $url/v1/o/$org/developers/joe@weathersample.com -X DELETE

echo "Deleting Products"

curl -u $username:$password $url/v1/o/$org/apiproducts/FreeProduct -X DELETE

curl -u $username:$password $url/v1/o/$org/apiproducts/CheapProduct -X DELETE

curl -u $username:$password $url/v1/o/$org/apiproducts/ExpensiveProduct -X DELETE

echo "\nCleanup Completed\n"
