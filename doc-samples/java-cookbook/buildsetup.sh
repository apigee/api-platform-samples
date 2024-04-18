#!/bin/bash
# -*- mode:shell-script; coding:utf-8; -*-
#
# Copyright © 2024 Google, LLC.
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#      http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
#
# All rights reserved.

echo
echo "This script downloads Apigee JAR files and installs them into the local Maven repo."
echo

curl "https://us-maven.pkg.dev/apigee-release/apigee-java-callout-dependencies/com/apigee/gateway/libraries/message-flow/1.0.0/message-flow-1.0.0.jar" -v -L -o message-flow-1.0-0.jar

mvn install:install-file \
    -Dfile=message-flow-1.0.0.jar \
    -DgroupId=com.apigee.gateway.libraries \
    -DartifactId=message-flow \
    -Dversion=1.0.0 \
    -Dpackaging=jar \
    -DgeneratePom=true

rm message-flow-1.0.0.jar

curl "https://us-maven.pkg.dev/apigee-release/apigee-java-callout-dependencies/com/apigee/infra/libraries/expressions/1.0.0/expressions-1.0.0.jar" -v -L -o expressions-1.0.0.jar

mvn install:install-file \
    -Dfile=expressions-1.0.0.jar \
    -DgroupId=com.apigee.infra/libraries \
    -DartifactId=expressions \
    -Dversion=1.0.0 \
    -Dpackaging=jar \
    -DgeneratePom=true

rm expressions-1.0.0.jar

echo
echo "done."
echo
