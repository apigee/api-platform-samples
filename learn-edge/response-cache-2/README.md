# Response cache Part 2: Set response headers

In this Learn Edge example, we add a twist to the [response-headers-1](../response-headers-1/README.md) example: we use an Assign Message policy to set headers that show information about the cache including whether there was a cache hit or not.  

**Note:** The [Assign Message policy](http://docs.apigee.com/api-services/reference/assign-message-policy) is one of the most commonly used policies in Apigee Edge. It is used to create and modify HTTP response and request messages (headers, query parameters, message body, and so on).

### Prerequisites

Be sure to perform the [prerequisites](https://github.com/apigee/api-platform-samples/tree/master/learn-edge#prerequisites) if you haven't already.

### Provision the required entities

We assume you've provisioned the Product, Developer App, and Developer as explained in `apikey-security`. If you want to redo it, here's how:

1. `cd api-platform-samples/learn-edge/provisioning`.
2. `./cleanup.sh`.
3. `./setup.sh`.

### Deploy it

1. `cd api-platform-samples/learn-edge/response-cache-2`.
2. `./deploy.sh`

### Run it

1. `./invoke.sh`
4. **The thing to notice**: Look at the response headers returned in your terminal. Notice that about every 3 seconds you get a `CACHE-HIT=true` header, and the rest of the time you get `CACHE-HIT=false` header. Why? If you look in the Response Cache policy, you'll see the cache expiration is set for 3 seconds:

```xml
    <ExpirySettings>
        <TimeoutInSec>3</TimeoutInSec>
    </ExpirySettings>
```

### Trace it

Go to the Edge UI and run a Trace on this API. The main thing to notice is that the Assign Response Headers policy executes last -- we put it in the ProxyEndpoint PostFlow Response. 

### About what changed

* We added a **SetResponseHeaders policy** to the proxy. It is in the `apiproxy/policies` folder and it is called `SetResponseHeaders.xml`:

    ```xml
        <AssignMessage async="false" continueOnError="false" enabled="true" name="SetResponseHeaders">
            <DisplayName>Set Response Headers</DisplayName>
            <Properties/>
            <Set>
                <Headers>
                  <Header name="X-CACHE-HIT">{responsecache.ResponseCache.cachehit}</Header>
                  <Header name="X-CACHE-NAME">{responsecache.ResponseCache.cachename}</Header>
                  <Header name="X-CACHE-KEY">{responsecache.ResponseCache.cachekey}</Header>
                  <Header name="X-CACHE-INVALID-ENTRY">{responsecache.ResponseCache.invalidentry}</Header>
                </Headers>
            </Set>
            <IgnoreUnresolvedVariables>true</IgnoreUnresolvedVariables>
            <AssignTo createNew="false" transport="http" type="response"/>
        </AssignMessage>
    ```

    **Important to note**: Whenever the Response Cache policy executes, a number of related flow variables are set. They have the naming pattern `responsecache.<Policy Name>.<Variable Name>`. Most policies set some variables, and they are always listed in the policy documentation. 

* We **attach the policy** to the ProxyEndpoint's PostFlow Response. By placing it there, we ensure that it will execute just before a response is sent to the client. (Unless, of course, there's an error - in that case, control is diverted directly to the Error Flow).  

    ```xml
        <ProxyEndpoint name="default">
          ...
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
          <PostFlow>
            <Response>
              <Step>
                <Name>SetResponseHeaders</Name>
              </Step>
            </Response>
          </PostFlow>
        ...
    ```


### Extra reading: Important terms and concepts

* **Policy flow variables:** Most, if not all, policies have a set of flow variables that they set when the policy executes. It's extremely common to use these variables in other policies or to set conditional flows. 
* **ProxyEndpoint PostFlow Response:** This flow always executes before a response is sent to the client, unless there's an error, in which case everything diverts to the Error Flow.  


### Next step

The next proxy, [extract-json-payload](../extract-json-payload/README.md), sets custom response headers with data extracted from a JSON payload.

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
