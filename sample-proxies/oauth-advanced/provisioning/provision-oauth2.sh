#!/bin/sh

source ../../../setup/setenv.sh

echo "Enter your password for the Apigee Enterprise organization, followed by [ENTER]:"

read -s password

echo using $username and $org

echo Install API Products

curl -u $username:$password $url/v1/o/$org/apiproducts \
  -H "Content-Type: application/json" -X POST -T oauth2-product.json

echo Create developers

curl -u $username:$password $url/v1/o/$org/developers \
  -H "Content-Type: application/xml" -X POST -T oauth2-developer.xml

echo Create apps

curl -u $username:$password \
  $url/v1/o/$org/developers/oauth2dev@example.com/apps \
  -H "Content-Type: application/xml" -X POST -T oauth2-app.xml


# Get consumer key and attach API product
# Do this in a quick and clean way that doesn't require python or anything

echo Get app info
curl -u $username:$password -H "Accept: application/json" \
     $url/v1/o/$org/developers/oauth2dev@example.com/apps/oauth2-app

key=`curl -u $username:$password -H "Accept: application/json" \
     $url/v1/o/$org/developers/oauth2dev@example.com/apps/oauth2-app 2>/dev/null \
     | grep consumerKey | awk -F '\"' '{ print $4 }'`

secret=`curl -u $username:$password -H "Accept: application/json" \
     $url/v1/o/$org/developers/oauth2dev@example.com/apps/oauth2-app 2>/dev/null \
     | grep consumerSecret | awk -F '\"' '{ print $4 }'`

curl -u $username:$password \
  $url/v1/o/$org/developers/oauth2dev@example.com/apps/oauth2-app/keys/${key} \
  -H "Content-Type: application/xml" -X POST -T oauth2-product.xml

echo "\n\nConsumer key for oauth2-app is ${key}"
echo "\n\nConsumer secret for oauth2-app is ${secret}"
