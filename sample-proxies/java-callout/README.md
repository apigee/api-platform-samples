# Java Callout Sample

This sample provides a simple implementation of the JavaCallout API.

Additional generic code samples are provided for reference in the `/java/src/com/sample` directory.

A JavaCallout is implemented to the JavaCallout API. Javadocs are available at:
https://github.com/apigee/api-platform-samples/wiki/Apigee-API-Platform-Samples-Wiki

The proxy uses the Yahoo Weather API for target endpoint, and maps WEOID IDs to city names on behalf of the user.

# Set up

* The username and password that you use to login to enterprise.apigee.com.
* The name of the organization in which you have an account. Login to 
  enterprise.apigee.com and check account settings.

# Configure 

Update `/setup/setenv.sh` with your environment details

# Import and deploy sample project

To deploy, run `$ sh deploy.sh`

To test, run `$ sh invoke.sh`

# Compiling the source

If you make modifications to the Java sample, you can recompile it as follows:

    cd ./java
    javac -d bin -sourcepath src -classpath ../lib/expressions-1.0.0.jar:../lib/message-flow-1.0.0.jar src/com/sample/CityLookup.java
    cd bin
    jar -cvf CityLookup.jar ./com
    cp CityLookup.jar ../../apiproxy/resources/java

# Get help

For assistance, post to the [Apigee Developer Forum](http://support.apigee.com)

Copyright © 2013 Apigee Corporation

Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy
of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
