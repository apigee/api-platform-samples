# Enhance performance with response caching

Caches responses from a backend target, making it unnecessary to go to the target for every request.

This example introduces **response caching**, a popular feature in Edge that **speeds up a proxy's performance**. The Response Cache policy caches responses from the backend target. When Edge can pull a response from the cache, it circumvents the target entirely, greatly speeding up the overall response time. 

### What's interesting about this sample

* A **ResponseCache policy** (configured in [apiproxy/policies/ResponseCache.xml](https://github.com/apigee/api-platform-samples/blob/b8840b4fd6d0cc2a4ac0a2aab50a53ead8067490/edge-ux/response-cache-simple/apiproxy/policies/ResponseCache.xml#L2-L10)) sets typical caching properties. This includes a cache key to uniquely identify the cache entry and an expiration setting specifying how long a cache entry should be considered fresh:

    ```xml
    <ResponseCache async="false" continueOnError="false" 
        enabled="true" name="ResponseCache">
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

* The ResponseCache policy is somewhat unique in that it has to be attached in **two places**. First, it's attached the ProxyEndpoint's Preflow. You can see where in the file [apiproxy/proxies/default.xml](https://github.com/apigee/api-platform-samples/blob/b8840b4fd6d0cc2a4ac0a2aab50a53ead8067490/edge-ux/response-cache-simple/apiproxy/proxies/default.xml#L5-L7).

    ```xml
    <PreFlow>
        <Request>
          <Step>
            <Name>ResponseCache</Name>
          </Step>
        </Request>
    </PreFlow>
    ...
    ```

* Then, the policy is attached to the TargetEndpoint's PostFlow Response flow. You can find it in the [apiproxy/targets/default.xml](https://github.com/apigee/api-platform-samples/blob/b8840b4fd6d0cc2a4ac0a2aab50a53ead8067490/edge-ux/response-cache-simple/apiproxy/targets/default.xml#L5-L7) file. This flow executes after the response comes back from the target, just before the response is sent back to the client app. You can really see this behavior in action when you use the Trace tool. 

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

* [**Response caching:**](http://docs.apigee.com/api-services/reference/response-cache-policy) Caching response data to greatly speed up proxy performance. 
* [**Flow variables:**](http://docs.apigee.com/api-services/content/flow-variables-and-conditions) Flow variables give you access to the runtime context while proxy requests and responses flow through the Edge pipeline.  
* [**Flow variable scope:**](http://docs.apigee.com/api-services/content/introduction-flow-variables#understandingflowvariablescope) All flow variables have scope, and some variables are only available in certain flow segments. The variable we used, `request.uri`, happens to be available in all scopes. The [Variables reference](http://docs.apigee.com/api-services/reference/variables-reference) in the Edge docs tells you the scope of each built-in flow variable. 
* [**TargetEndpoint PostFlow:**](https://docs.apigee.com/api-services/reference/api-proxy-configuration-reference#targetendpoint) All of the flows have pre and post segments. For now, just remember that the post segment is executed last.

### Ask the community

[Apigee Community](https://community.apigee.com?via=github) is a great place to ask questions and find answers about developing API proxies.

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
