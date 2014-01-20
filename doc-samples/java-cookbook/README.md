# Java Callout Sample

This sample provides a simple implementation of a proxy that uses the JavaCallout policy and
that implements Apigee's JavaCallout Java API.

For a complete description of this proxy sample, see the API Proxy Cookbook topic at:

http://apigee.com/docs/api-platform/content/use-java-customize-api 

Javadoc for the Apigee JavaCallout API Java classes are included in this sample download in:

/api-platform-samples/doc-samples/java-cookbook/javdocs-javacallout

Additional code samples are provided for reference in the '/java/src/com/apigee' directory.
These additional samples demonstrate various blocking and non-blocking patterns you can
use with JavaCallout. They are commented.


This sample proxy uses the Yahoo Weather API for a target endpoint, and maps WEOID IDs to city names on behalf of the user.

# Set up

 - The username and password that you use to log in to enterprise.apigee.com.
 - The name of the organization in which you have an account. 
 - Log in to enterprise.apigee.com and check account settings.

# Configure 

Update `/setup/setenv.sh` with your environment details.

# Compile and package source code

The Java source code in this sample download must be compiled and packaged in a JAR
before you can deploy it. Note, the doc-samples/java-cookbook/lib directory is required.
It was downloaded with this doc sample. If you do not have this directory, you must grab
it from Github.

 1. cd .../api-platform-samples/java-cookbook/doc-samples/java
 2. mkdir bin
 3. javac -d bin -sourcepath src -classpath ../lib/expressions-1.0.0.jar:../lib/message-flow-1.0.0.jar src/com/apigee/CityLookup.java
 4. cd bin
 5. jar -cvf CityLookup.jar ./com
 6. mkdir -p ../../apiproxy/resources/java
 7. cp CityLookup.jar ../../apiproxy/resources/java

 Note: Follow these compile/package instructions anytime you modify the Java source code. 

# Deploy and invoke the sample proxy.

To deploy, run `$ sh deploy.sh`

To test, run `$ sh invoke.sh`


# Get help

For assistance, please use [StackOverflow](http://stackoverflow.com/tags/apigee) and add the tag "apigee".

Copyright © 2014 Apigee Corporation

Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy
of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
