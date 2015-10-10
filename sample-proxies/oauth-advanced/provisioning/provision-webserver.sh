#!/bin/bash

source ../../../setup/setenv.sh

echo "Enter your password for the Apigee Enterprise organization, followed by [ENTER]:"

read -s password

echo using $username and $org

echo Install API Products

curl -u $username:$password $url/v1/o/$org/apiproducts \
  -H "Content-Type: application/json" -X POST -T webserver-product.json

echo Create developers

curl -u $username:$password $url/v1/o/$org/developers \
  -H "Content-Type: application/xml" -X POST -T webserver-developer.xml

echo Create apps

curl -u $username:$password \
  $url/v1/o/$org/developers/webdev@example.com/apps \
  -H "Content-Type: application/xml" -X POST -T webserver-app.xml


# Get consumer key and attach API product
# Do this in a quick and clean way that doesn't require python or anything

echo Get app info
curl -u $username:$password -H "Accept: application/json" \
     $url/v1/o/$org/developers/webdev@example.com/apps/webserver-app

key=`curl -u $username:$password -H "Accept: application/json" \
     $url/v1/o/$org/developers/webdev@example.com/apps/webserver-app 2>/dev/null \
     | grep consumerKey | awk -F '\"' '{ print $4 }'`

secret=`curl -u $username:$password -H "Accept: application/json" \
     $url/v1/o/$org/developers/webdev@example.com/apps/webserver-app 2>/dev/null \
     | grep consumerSecret | awk -F '\"' '{ print $4 }'`

curl -u $username:$password \
  $url/v1/o/$org/developers/webdev@example.com/apps/webserver-app/keys/${key} \
  -H "Content-Type: application/xml" -X POST -T webserver-product.xml

echo "\n\nConsumer key for webserver-app is ${key}"
echo "\n\nConsumer secret for webserver-app is ${secret}"
