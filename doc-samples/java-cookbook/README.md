# Java Callout Sample

This sample provides a simple implementation of a proxy that uses the JavaCallout policy. The policy executes custom Java code that implements Apigee's JavaCallout Java API. The Java callout converts response headers and response content to uppercase characters.  

## Running the sample
1. Add your account and Edge environment information to `api-platform-samples/setenv/setup.sh`. You will need your Apigee username and the name of the organization in which you have an account. 
2. Deploy the proxy:

    `./deploy.sh`

3. Send a request to the proxy:

    `./invoke.sh`
	
The proxy returns headers and JSON data that have been converted to uppercase. For example:

```
< HTTP/1.1 200 OK
< Date: Tue, 09 May 2017 16:36:10 GMT
< Content-Type: APPLICATION/JSON; CHARSET=UTF-8
< Content-Length: 68
< Connection: keep-alive
< Access-Control-Allow-Origin: *
< ETag: W/"44-RA5ERT/MMLIK54NVBWBSZG"
< X-Powered-By: APIGEE
< Server: Apigee Router
<
* Curl_http_done: called premature == 0
* Connection #0 to host willwitman-test.apigee.net left intact
{"FIRSTNAME":"JOHN","LASTNAME":"DOE","CITY":"SAN JOSE","STATE":"CA"}
```


## Compiling and repackaging the source code

This sample includes Java source code and two dependent packages. If you want to modify
any of the source code, you need to follow the instructions here for compiling, packaging,
and re-deploying. Then, you can invoke the proxy to see the effect of your changes.  

----------------------------------------------------------------------------------------
NOTE: The source code for this sample is located in:

      api-platform-samples/java-cookbook/doc-samples/java/src/com/apigeesample

The dependent libraries are located in:

    api-platform-samples/java-cookbook/lib
----------------------------------------------------------------------------------------

If you make any changes to the Java source code for this cookbook sample, follow these
steps to compile, package, and redeploy. Be sure to compile with the [supported version of Java](http://apigee.com/docs/api-services/reference/supported-software).

 1. In `/apiproxy/policies/cityLookUp.xml`, make sure the `<ClassName>` is correct.
 2. `cd ../api-platform-samples/doc-samples/java-cookbook/java`
 3. mkdir bin
 4.  `javac -d bin -classpath ../lib/expressions-1.0.0.jar:../lib/message-flow-1.0.0.jar:. src/com/apigeesample/ResponseUppercase.java`
 5. `cd bin`
 6. `jar -cvf ResponseUppercase.jar ./com`
 7. `cp ResponseUppercase.jar ../../apiproxy/resources/java`
 8. Redeploy the proxy by running the `deploy.sh` script.
 9. Test the redeployed proxy by running the `invoke.sh` script.

**Reserved package names**: The package name prefixes `com.apigee.*` and `io.apigee.*` are reserved. To avoid collisions and errors, don't use these in your Java Callout package names.

## More information
- Javadoc for the Apigee JavaCallout API Java classes are included in this sample download in:

    `/api-platform-samples/doc-samples/java-cookbook/javdocs-javacallout`

- Additional code samples are provided for reference in the `/java/src/com/apigeesample` directory.


## Ask the community

[![alt text](../../images/apigee-community.png "Apigee Community is a great place to ask questions and find answers about developing API proxies. ")](https://community.apigee.com?via=github)

---

Copyright © 2017 Apigee Corporation

Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy
of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
