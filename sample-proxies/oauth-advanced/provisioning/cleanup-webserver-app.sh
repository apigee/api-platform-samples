#!/bin/bash
# enter password as first argument or script will prompt you for it

source ../../../setup/setenv.sh

if [ -z "$1" ]; then

    printf "\nEnter your password for the Apigee Enterprise organization $org, followed by [ENTER]:\n"

    read -s password
fi

echo using $username and $org

echo "Deleting Apps"

curl -u $username:$password $url/v1/o/$org/developers/webdev@example.com/apps/webserver-app -X DELETE

echo "Deleting Developers"

curl -u $username:$password $url/v1/o/$org/developers/webdev@example.com -X DELETE

echo "Deleting Products"

curl -u $username:$password $url/v1/o/$org/apiproducts/webserver-product -X DELETE


echo "\nCleanup Completed\n"
