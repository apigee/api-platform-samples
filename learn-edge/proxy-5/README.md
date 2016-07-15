# Enance performance with response caching

**Response caching** is a popular feature that **speeds up your proxy performance** by caching responses from the backend target. When Edge can pull a response from the cache, it circumvents the target entirely, greatly speeding up the overall response time. Naturally, Edge has a Response Cache policy that makes adding this feature easy to do. 


### Provision the required entities

We assume you've provisioned the Product, Developer App, and Developer as explained in proxy-3. If you want to redo it, here's how:

1. `cd api-platform-samples/learn-edge/provisioning`.
2. `./cleanup.sh`.
3. `./setup.sh`.

### Try it

Deploy and invoke the proxy. These are the basic steps:

1. `cd api-platform-samples/tutorials/proxy-5`.
2. `./deploy.sh`
3. `./invoke.sh`
4. Compare the output to the `proxy-4` output. 

### About what changed

* We added a **ResponseCache policy** to the proxy. It is in the `apiproxy/policies` folder and it is called `ResponseCache.xml`:

    ```xml
        <ResponseCache async="false" continueOnError="false" enabled="true" name="ResponseCache">
            <DisplayName>ResponseCache</DisplayName>
            <CacheKey>
                <KeyFragment ref="request.uri" type="string"/>
            </CacheKey>
            <ExpirySettings>
                <TimeoutInSec>10</TimeoutInSec>
            </ExpirySettings>
        </ResponseCache>
    ```

    Note two things of interest: **First**, the KeyFragment is a string that's concatenated onto the cache key. It allows you to keep caches for different requests separated. **Second**, the "ref" part of the KeyFragment, `request.uri`, is a **flow variable**. Flow variables are **extremely** important in Edge development -- they allow you to access all kinds data within the context of proxy flows. The `request.uri` variable is a "built-in" variable that's populated automatically on each request. It's basically the entire request URI including query parameters. Anyway, that string value will become part of the cache key.

* In the `apiproxy/proxies/default.xml` file, we **attach the policy** to the ProxyEndpoint's Preflow. VerifyAPIKey is still there. We don't have to touch it. 

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

* The ResponseCache policy is a little unique in that it has to be attached in **two places**. The second attachment point is the TargetEndpoint's PostFlow Response flow. You can find it in the `apiproxy/targets/default.xml` file. This flow executes after the response comes back from the target, just before the response is sent back to the client app. 

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

### Important words and concepts

* **Response caching:** Caching response data to greatly speed up proxy performance. 
* **Flow variables:** A huge concept in Edge and important to begin to understand now. Flow variables give you access to the runtime context while proxy requests and responses flow through the Edge pipeline. 
* **TargetEndpoint PostFlow:** All of the flows have pre and post segments. For now, just remember that the post segment is executed last. For later, remember that flow variables have scope, and some variables are only available in certain flow segments. The variable we used, `request.uri`, happens to be available in all scopes. 

### Things to try

* Go to the Edge UI and start a Trace session. Then call the API 10 or 15 times. You will be able to see in the Trace output when the cache is either "hit" or "missed". 
* Try using a benchmark tool like Apache ab to prove that caching improves perforance. Run a benchmark of a hundred or so requests with the cache policies in place. Then, remove them, redeploy, and run the test again. For example:

`ab -n 100 -c 10 http://your-org-test.apigee.net/learn-edge/json`

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
