#!/bin/bash

echo This script deploys all sample API proxies to your organization on the Apigee API platform.

echo Before running this script, set environment variables in ./setenv.sh

echo Make sure permissions are set correctly for deploy scripts

chmod u+rwx ./*/deploy.sh

echo Deploying ApiKeyValidation

cd ./ApiKeyValidation
./deploy.sh
cd ..

echo Deploying Conditional Policies

cd ./ConditionalPolicies
./deploy.sh
cd ..

echo Deploying ContentRouting

cd ./ContentRouting
./deploy.sh
cd ..

echo Deploying DynamicEnpointURI

cd ./DynamicEnpointURI
./deploy.sh
cd ..

echo Deploying JavaCallout

cd ./JavaCallout
./deploy.sh
cd ..

echo Deploying JavaScript

cd ./JavaScript
./deploy.sh
cd ..

echo Deploying PythonScript

cd ./PythonScript
./deploy.sh
cd ..

echo Deploying XMLToJSON

cd ./XMLToJSON
./deploy.sh
cd ..

echo Deploying RateLimit

cd RateLimit
./deploy.sh
cd ..

echo Deploying RateLimitConditional

cd RateLimitConditional
./deploy.sh
cd ..

echo Finished. Refer to README files for each sample for instructions on invoking the samples using curl or another HTTP client application.
echo For example: $ curl http://myorgname-test.apigee.net/samples-ratelimit

echo After deployment, you can also login to enterprise.apigee.com to view the samples, apply policies, view operational metrics, and more.

echo Visit the Developer Forum at support.apigee.com!