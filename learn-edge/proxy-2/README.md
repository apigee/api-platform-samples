# Proxy to a target service

### Try it

Deploy and invoke the proxy. These are the basic steps:

1. `cd api-platform-samples/tutorials/proxy-2`.
2. `./deploy.sh`
3. `./invoke.sh`
4. Compare the output to the `proxy-1` output. 

### About what changed

To get our proxy to call a target service, we made a few changes to the simple do-nothing proxy we deployed before. 

* In the `apiproxy/proxies/default.xml` file, we change the RouteRule from "noroute" to point to the TargetEndpoint called "default". 

   ```xml
   <RouteRule name="default">
        <!-- This connects our proxy to the target defined in apiproxy/targets/default.xml -->
        <TargetEndpoint>default</TargetEndpoint>
   </RouteRule>
   ```

* We add a `default.xml` file in the `apiproxy/targets` directory. In that file, we add this XML block, which specifies the target of the proxy, an HTTP URL:

   ```xml
   <TargetEndpoint name="default">
      <HTTPTargetConnection>
        <!-- This is where we define the target. For this sample we just use a simple URL. -->
        <URL>http://mocktarget.apigee.net/</URL>
      </HTTPTargetConnection>
   </TargetEndpoint>
   ```

It points the proxy to a mock service called `http://mocktarget.apigee.net` that Apigee uses for samples and testing.

### Important words and concepts

* The name of the target endpoint can be anything, but it has to match the name of a file in the `targets` directory. ?? Is this true ?? What if the file was called foo.xml ??
* Target service -- A backend service that the proxy calls on behalf of the requesting app. Here, we're going to return data from a service called `mocktarget.apigee.net`. 
* RouteRule -- Specifies which target endpoint definition file to call. Route rules can have logic to route calls conditionally to different targets. 
* TargetEndpoint -- The name of a target definition in the apiproxy/targets directory. 
* HTTPTargetConnection -- Defines the target to which to send the request. Usually a URL. 

### Things to try

* In a browser, hit http://mocktarget.apigee.net/help to see what else the service can do. 
* Modify the `invoke.sh` script to hit one of the other resources. For example: `curl http://<your org>-test.apigee.net/json`. 

**Notable Concept**: By default, whatever you add to the base path of the API proxy gets passed on unchanged to the target. 

* Change the proxy so it calls a different endpoint, maybe a service you are familiar with and test the change (redeploy and invoke). Hint: Edit 


### Ask the community

[![alt text](../../images/apigee-community.png "Apigee Community is a great place to ask questions and find answers about developing API proxies. ")](https://community.apigee.com?via=github)

---

Copyright © 2016 Apigee Corporation

Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy
of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
