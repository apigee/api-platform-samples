#!/bin/bash

source ../../setup/setenv.sh

echo "Enter your password for the Apigee Enterprise organization $org, followed by [ENTER]:"

read -s password

echo Deploying $proxy to $env on $url using $username and $org

cd ./java
javac -d bin -sourcepath src -classpath ../lib/libphonenumber-5.8.jar:../lib/expressions-1.0.0.jar:../lib/message-flow-1.0.0.jar: src/com/samples/apigee/phone/ValidateNumber.java
cd bin
jar -cvf ValidateNumber.jar ./com
cp ValidateNumber.jar ../../apiproxy/resources/java
cp ../../lib/libphonenumber-5.8.jar ../../apiproxy/resources/java
cd ../..
rm -fr java/bin/*

../../tools/deploy.py -n validatemsisdn  -u $username:$password -o $org -h $url -e $env -p / -d ../validatemsisdn
rm -fr apiproxy/resources/java/*

echo "If 'State: deployed', then your API Proxy is ready to be invoked."

echo "Run 'invoke.sh'"
