#!/bin/sh

## Ensure configuration variables have been set.
source ../../setup/userconf.sh || exit 1
get_password || exit 1

echo using $username and $org

echo "Deleting Apps"

curl -u $username:$password $url/v1/o/$org/developers/learn-edge-developer@example.com/apps/learn-edge-app -X DELETE

echo "Deleting Developers"

curl -u $username:$password $url/v1/o/$org/developers/learn-edge-developer@example.com -X DELETE


echo "Deleting Products"

curl -u $username:$password $url/v1/o/$org/apiproducts/LearnEdgeProduct -X DELETE

echo "\nCleanup Completed\n"
