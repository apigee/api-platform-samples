#!/bin/bash
# enter password as first argument or script will prompt you for it

source ../../../setup/setenv.sh

if [ -z "$1" ]; then

    printf "\nEnter your password for the Apigee Enterprise organization $org, followed by [ENTER]:\n"

    read -s password
fi

echo Install API Products

curl -u $username:$password $url/v1/o/$org/apiproducts \
  -H "Content-Type: application/json" -X POST -T login-app-product.json

echo Create developers

curl -u $username:$password $url/v1/o/$org/developers \
  -H "Content-Type: application/xml" -X POST -T login-app-developer.xml

echo Create apps

curl -u $username:$password \
  $url/v1/o/$org/developers/loginappdev@example.com/apps \
  -H "Content-Type: application/xml" -X POST -T login-app.xml


# Get consumer key and attach API product
# Do this in a quick and clean way that doesn't require python or anything

echo Get app info
curl -u $username:$password -H "Accept: application/json" \
     $url/v1/o/$org/developers/loginappdev@example.com/apps/login-app

key=`curl -u $username:$password -H "Accept: application/json" \
     $url/v1/o/$org/developers/loginappdev@example.com/apps/login-app 2>/dev/null \
     | grep consumerKey | awk -F '\"' '{ print $4 }'`

secret=`curl -u $username:$password -H "Accept: application/json" \
     $url/v1/o/$org/developers/loginappdev@example.com/apps/login-app 2>/dev/null \
     | grep consumerSecret | awk -F '\"' '{ print $4 }'`

curl -u $username:$password \
  $url/v1/o/$org/developers/loginappdev@example.com/apps/login-app/keys/${key} \
  -H "Content-Type: application/xml" -X POST -T login-app-product.xml
