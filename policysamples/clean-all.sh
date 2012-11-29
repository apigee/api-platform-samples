#!/bin/bash

echo Deleting all sample proxies from your organization
echo Set username, password, organization in ./setenv.sh

chmod u+rwx ./*/cleanup.sh

cd ApiKeyValidation
./cleanup.sh
cd ..
cd ConditionalPolicies
./cleanup.sh
cd ..
cd ContentRouting
./cleanup.sh
cd ..
cd DynamicEnpointURI
./cleanup.sh
cd ..
cd JavaCallout
./cleanup.sh
cd ..
cd JavaScript
./cleanup.sh
cd ..

cd PythonScript
./cleanup.sh
cd ..
cd XMLToJSON
./cleanup.sh
cd ..
cd RateLimit
./cleanup.sh
cd ..
cd RatelimitConditional
./cleanup.sh
cd ..