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

# Deploy and invoke the sample proxy.

To deploy, run `$ sh deploy.sh`

To test, run `$ sh invoke.sh`

# Compiling and repackaging the source code

This sample includes Java source code and two dependent packages. If you want to modify
any of the source code, you need to follow the instructions here for compiling, packaging,
and re-deploying. Then, you can invoke the proxy to see the effect of your changes.  

----------------------------------------------------------------------------------------
NOTE: The source code for this sample is located in:

      api-platform-samples/java-cookbook/doc-samples/java/src/com/apigee

The dependent libraries are located in:

    api-platform-samples/java-cookbook/lib. 
----------------------------------------------------------------------------------------

If you make any changes to the Java source code for this cookbook sample, follow these
steps to compile, package, and redeploy:

 1. cd .../api-platform-samples/java-cookbook/doc-samples/java
 2. mkdir bin
 3. javac -d bin -sourcepath src -classpath ../lib/expressions-1.0.0.jar:../lib/message-flow-1.0.0.jar src/com/apigee/CityLookup.java
 4. cd bin
 5. jar -cvf CityLookup.jar ./com
 6. cp CityLookup.jar ../../apiproxy/resources/java
 7. Redeploy the proxy by running the deploy.sh script.
 8. Test the redeployed proxy by running the invoke.sh script.

# Ask the community

[![alt text](../images/apigee-community.png "Apigee Community is a great place to ask questions and find answers about developing API proxies. ")](https://community.apigee.com?via=github)

---

Copyright © 2015 Apigee Corporation

Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy
of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.