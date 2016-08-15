# Enhance performance with response caching

In this Learn Edge example, we introduce **response caching** a popular feature in Edge that **speeds up a proxy's performance**. The Response Cache policy caches responses from the backend target. When Edge can pull a response from the cache, it circumvents the target entirely, greatly speeding up the overall response time. 

### Prerequisites

Be sure to perform the [prerequisites](https://github.com/apigee/api-platform-samples/tree/master/learn-edge#prerequisites) if you haven't already.

### Provision the required entities

We assume you've provisioned the Product, Developer App, and Developer as explained in `apikey-security`. If you want to redo it, here's how:

1. `cd api-platform-samples/learn-edge/provisioning`.
2. `./cleanup.sh`.
3. `./setup.sh`.

### Deploy it

1. `cd api-platform-samples/learn-edge/response-cache-1`.
2. `./deploy.sh`

### Run it

3. `./invoke.sh` 

### Trace it

Go to the Edge UI and run a Trace on this API. Note that the response cache is set with an expiration time of 3 seconds. It's interesting to trace the flow when caching is enabled. You can see where a response is pulled from the cache, in which case no call is made to the backend target. Note the dramatic difference in response time when requests pull from the cache. 

### About what changed

* We added a **ResponseCache policy** to the proxy. It is in the `apiproxy/policies` folder and it is called `ResponseCache.xml`:

    ```xml
        <ResponseCache async="false" continueOnError="false" enabled="true" name="ResponseCache">
            <DisplayName>ResponseCache</DisplayName>
            <CacheKey>
                <KeyFragment ref="request.uri" type="string"/>
            </CacheKey>
            <ExpirySettings>
                <TimeoutInSec>3</TimeoutInSec>
            </ExpirySettings>
        </ResponseCache>
    ```

    **Important to note**: The KeyFragment is a string that's concatenated onto the cache key. It allows you to keep caches for different requests separated. The "ref" part of the KeyFragment, `request.uri`, is a **flow variable**. Flow variables are **extremely** important in Edge development -- they allow you to access all kinds data within the context of proxy flows. The `request.uri` variable is a "built-in" variable that's populated automatically on each request. It's basically the entire request URI including query parameters. 

* The ResponseCache policy is somewhat unique in that it has to be attached in **two places**. First, we attach the policy to the ProxyEndpoint's Preflow. You can see where in the file `apiproxy/proxies/default.xml`. VerifyAPIKey is still there (it executes first). We don't have to touch it. 

    ```xml
        <PreFlow>
            <Request>
              <Step>
                <Name>VerifyAPIKey</Name>
              </Step>
              <Step>
                <Name>ResponseCache</Name>
              </Step>
            </Request>
        </PreFlow>
        ...
    ```

* The second attachment point is the TargetEndpoint's PostFlow Response flow. You can find it in the `apiproxy/targets/default.xml` file. This flow executes after the response comes back from the target, just before the response is sent back to the client app. You can really see this behavior in action when you use the Trace tool. 

    ```xml
        <TargetEndpoint name="default">
            <PostFlow name="PostFlow">
                <Request/>
                <Response>
                    <Step>
                        <Name>ResponseCache</Name>
                    </Step>
                </Response>
            </PostFlow>
          ...
    ```

### Extra reading: Important terms and concepts

* **Response caching:** Caching response data to greatly speed up proxy performance. 
* **Flow variables:** Flow variables give you access to the runtime context while proxy requests and responses flow through the Edge pipeline.  
* **Flow variable scope:** All flow variables have scope, and some variables are only available in certain flow segments. The variable we used, `request.uri`, happens to be available in all scopes. The [Variables reference](http://docs.apigee.com/api-services/reference/variables-reference) in the Edge docs tells you the scope of each built-in flow variable. 
* **TargetEndpoint PostFlow:** All of the flows have pre and post segments. For now, just remember that the post segment is executed last.

### Things to try

* Go to the Edge UI and start a Trace session. Then call the API 10 or 15 times. You will be able to see in the Trace output when the cache is either "hit" or "missed". 
* Try using a benchmark tool like Apache `ab` to prove that caching improves performance. Run a benchmark of a hundred or so requests with the cache policies in place. Then, remove them, redeploy, and run the test again. For example:

`ab -n 100 -c 10 http://your-org-test.apigee.net/learn-edge/json`


### Next step

The next proxy, [response-cache-2](../response-cache-2/README.md), sets custom response headers to indicate cache hits and misses.

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
