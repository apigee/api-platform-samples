#!/bin/bash

## Ensure configuration variables have been set.
source ../../setup/userconf.sh || exit 1
get_password || exit 1

echo using $username and $org

# Install API Products

curl -u $username:$password $url/v1/o/$org/apiproducts \
  -H "Content-Type: application/json" -X POST -T LearnEdgeProduct.json

# Create developers

curl -u $username:$password $url/v1/o/$org/developers \
  -H "Content-Type: application/xml" -X POST -T learn-edge-developer.xml

# Create apps

curl -u $username:$password \
  $url/v1/o/$org/developers/learn-edge-developer@example.com/apps \
  -H "Content-Type: application/xml" -X POST -T learn-edge-app.xml

# Get consumer key and attach API product

key=`curl -u $username:$password -H "Accept: application/json" \
     $url/v1/o/$org/developers/learn-edge-developer@example.com/apps/learn-edge-app 2>/dev/null \
     | grep consumerKey | awk -F '\"' '{ print $4 }'`

curl -u $username:$password \
  $url/v1/o/$org/developers/learn-edge-developer@example.com/apps/learn-edge-app/keys/${key} \
  -H "Content-Type: application/xml" -X POST -T learn-edge-product.xml

key=`curl -u $username:$password -H "Accept: application/json"\
     $url/v1/o/$org/developers/learn-edge-developer@example.com/apps/learn-edge-app 2>/dev/null \
     | grep consumerKey | awk -F '\"' '{ print $4 }'`

echo "\n\nConsumer key for learn-edge-app is ${key}"

