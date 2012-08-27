#!/bin/sh

echo This script creates all entities in your organization required for the OAuth Quick Start
echo To run the script, use the credentials you use to login to enterprise.apigee.com/login
echo If you need an account, visit enterprise.apigee.com/trial to request a trial account

echo "Enter your USERNAME (the email you use to login to enterprise.apigee.com/login), followed by [ENTER]:"
read username

echo "Enter your PASSWORD (the password you use to login to enterprise.apigee.com/login), followed by [ENTER]:"
read -s password

echo "Enter the name of your Apigee ORGANIZATION (check settings in enterprise.apigee.com/login), followed by [ENTER]:"
read org

echo using $username and $org

# Install API Products

curl -u ${username}:${password} https://api.enterprise.apigee.com/v1/o/${org}/apiproducts \
  -H "Content-Type: application/xml" -X POST -T FreeProduct.xml

curl -u ${username}:${password} https://api.enterprise.apigee.com/v1/o/${org}/apiproducts \
  -H "Content-Type: application/xml" -X POST -T CheapProduct.xml

curl -u ${username}:${password} https://api.enterprise.apigee.com/v1/o/${org}/apiproducts \
  -H "Content-Type: application/xml" -X POST -T ExpensiveProduct.xml

# Create developers

curl -u ${username}:${password} https://api.enterprise.apigee.com/v1/o/${org}/developers \
  -H "Content-Type: application/xml" -X POST -T thomas.xml

curl -u ${username}:${password} https://api.enterprise.apigee.com/v1/o/${org}/developers \
  -H "Content-Type: application/xml" -X POST -T joe.xml

# Create apps

curl -u ${username}:${password} \
  https://api.enterprise.apigee.com/v1/o/${org}/developers/thomas@weathersample.com/apps \
  -H "Content-Type: application/xml" -X POST -T thomas-app.xml

curl -u ${username}:${password} \
  https://api.enterprise.apigee.com/v1/o/${org}/developers/joe@weathersample.com/apps \
  -H "Content-Type: application/xml" -X POST -T joe-app.xml

# Get consumer key and attach API product
# Do this in a quick and dirty way that doesn't require python or anything

key=`curl -u ${username}:${password} \
     https://api.enterprise.apigee.com/v1/o/${org}/developers/thomas@weathersample.com/apps/thomas-app \
     | grep consumerKey | awk -F '\"' '{ print $4 }'`

curl -u ${username}:${password} \
  https://api.enterprise.apigee.com/v1/o/${org}/developers/thomas@weathersample.com/apps/thomas-app/keys/${key} \
  -H "Content-Type: application/xml" -X POST -T thomas-app-product.xml

key=`curl -u ${username}:${password} \
     https://api.enterprise.apigee.com/v1/o/${org}/developers/joe@weathersample.com/apps/joe-app \
     | grep consumerKey | awk -F '\"' '{ print $4 }'`

curl -u ${username}:${password} \
  https://api.enterprise.apigee.com/v1/o/${org}/developers/joe@weathersample.com/apps/joe-app/keys/${key} \
  -H "Content-Type: application/xml" -X POST -T joe-app-product.xml

key=`curl -u ${username}:${password} \
     https://api.enterprise.apigee.com/v1/o/${org}/developers/thomas@weathersample.com/apps/thomas-app \
     | grep consumerKey | awk -F '\"' '{ print $4 }'`
echo "Consumer key for thomas-app is ${key}"

key=`curl -u ${username}:${password} \
     https://api.enterprise.apigee.com/v1/o/${org}/developers/joe@weathersample.com/apps/joe-app \
     | grep consumerKey | awk -F '\"' '{ print $4 }'`
echo "Consumer key for joe-app is ${key}"

