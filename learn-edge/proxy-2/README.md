# Proxy to a target service

We'll modify the first proxy "do-nothing" proxy so that it calls an actual backend target service. This proxy does actual work!

### Try it

Deploy and invoke the proxy. These are the basic steps:

1. `cd api-platform-samples/tutorials/proxy-2`.
2. `./deploy.sh`
3. `./invoke.sh`
4. Compare the output to the `proxy-1` output. 

### View it in the Edge UI

Go to the Edge UI and run a Trace on this API. How does it differ from the Trace you saw in `proxy-1`?

### About what changed

To get our proxy to call a target service, we made a few changes to the simple do-nothing proxy we deployed before. 

* In the `apiproxy/proxies/default.xml` file, we changed the RouteRule element. The `name` attribute isn't that important in this example, but the `<TargetEndpoint>` element is important. That element refers to a TargetEndpoint definition that must exist and have the name "default". 

  **Tip:** It might help if you open these files and look at them in their entirety.

   ```xml
   <RouteRule name="default">
        <!-- This connects our proxy to the target defined in apiproxy/targets/default.xml -->
        <TargetEndpoint>default</TargetEndpoint>
   </RouteRule>
   ```

* We defined the TargetEndpoint in a file called `apiproxy/targets/default.xml`. In that file, we added this XML block, which specifies the target of the proxy, a web service called `mocktarget.apigee.net`.

   ```xml
   <TargetEndpoint name="default">
      <HTTPTargetConnection>
        <!-- This is where we define the target. For this sample we just use a simple URL. -->
        <URL>http://mocktarget.apigee.net/</URL>
      </HTTPTargetConnection>
   </TargetEndpoint>
   ```

The name of the TargetEndpoint (default) is important -- it is the name referred to in the RouteRule element in `apiproxy/proxies/default.xml`. 

### What you did

You deployed a modified proxy that calls a backend target -- a web service used for simple testing purposes. 

### Extra reading: important words and concepts

* **Target service** -- A backend service that the proxy calls on behalf of the requesting app. Here, we're going to return data from a service called `mocktarget.apigee.net`. 
* **RouteRule** -- Specifies which target endpoint definition file to call. Route rules can have logic to route calls conditionally to different targets. 
* **TargetEndpoint** -- The name of a target definition in the apiproxy/targets directory. 
* **HTTPTargetConnection** -- Defines the target to which to send the request. Usually a URL. 

### Other things to try

* In a browser, hit http://mocktarget.apigee.net/help to see what else the service can do. 
* Modify the `invoke.sh` script to hit one of the other resources. For example: `curl http://<your org>-test.apigee.net/json`. 

  **Notable Concept**: By default, whatever you add to the base path of the API proxy gets passed on unchanged to the target. 

* Try changing the proxy to call another service. You might have to supply an API key or some other auth parameter -- many public API keys require some kind of auth.  Test the change (redeploy and invoke). Hint: Edit `apiproxy/targets/default.xml`.


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
