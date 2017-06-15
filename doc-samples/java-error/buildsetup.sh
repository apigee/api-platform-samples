#!/bin/bash
# -*- mode:shell-script; coding:utf-8; -*-
#
# Created: <Tue Oct  6 11:46:13 2015>
# Last Updated: <2015-October-06 11:53:42>
#

echo
echo "This script downloads JAR files and installs them into the local Maven repo."
echo

curl -O https://raw.githubusercontent.com/apigee/api-platform-samples/master/doc-samples/java-cookbook/lib/expressions-1.0.0.jar

 mvn install:install-file \
  -Dfile=expressions-1.0.0.jar \
  -DgroupId=com.apigee.edge \
  -DartifactId=expressions \
  -Dversion=1.0.0 \
  -Dpackaging=jar \
  -DgeneratePom=true

rm expressions-1.0.0.jar 

curl -O https://raw.githubusercontent.com/apigee/api-platform-samples/master/doc-samples/java-cookbook/lib/message-flow-1.0.0.jar

 mvn install:install-file \
  -Dfile=message-flow-1.0.0.jar \
  -DgroupId=com.apigee.edge \
  -DartifactId=message-flow \
  -Dversion=1.0.0 \
  -Dpackaging=jar \
  -DgeneratePom=true

rm message-flow-1.0.0.jar 

echo
echo done.
echo
