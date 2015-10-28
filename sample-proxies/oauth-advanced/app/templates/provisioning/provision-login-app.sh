#!/bin/bash
#usage: provision-login-app.sh $username $password $org $env $url
username=$1
password=$2
org=$3
env=$4
url=$5

echo using $username and $org

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
