#!/bin/bash

source ../../setup/setenv.sh

echo "Enter your password for the Apigee Enterprise organization $org, followed by [ENTER]:"

read -s password

echo Deploying $proxy to $env on $url using $username and $org

cd ./java
javac -d bin -sourcepath src -classpath ../lib/expressions-1.0.0.jar:../lib/message-flow-1.0.0.jar:../lib/j2plist-0.3.jar:../lib/jsonic-1.2.0.jar src/com/apigee/utils/jsontoplist/JSONtoPLIST.java
cd bin
jar -cvf JSONtoPLIST.jar ./com
cp JSONtoPLIST.jar ../../apiproxy/resources/java
cp ../../lib/j2plist-0.3.jar ../../apiproxy/resources/java
cp ../../lib/jsonic-1.2.0.jar ../../apiproxy/resources/java
cd ../..
rm -fr java/bin/*


../../tools/deploy.py -n JSONtoPLIST -u $username:$password -o $org -h $url -e $env -p / -d ../JSONtoPLIST

echo "If 'State: deployed', then your API Proxy is ready to be invoked."

echo "Run 'invoke.sh'"
