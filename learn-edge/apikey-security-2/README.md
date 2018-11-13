# Remove the apikey query parameter

In this Learn Edge example, we'll modify [apikey-security-1](../apikey-security-1) example slightly to remove the `apikey` query parameter so that it is not passed to the backend target service. This pattern is commonly used and a good practice. 

### Prerequisites

* If you haven't alread, be sure to perform the [prerequisites](https://github.com/apigee/api-platform-samples/tree/master/learn-edge#prerequisites).
* If you haven't already, be sure to do the "one-time setup" steps in the [apikey-security-1](../apikey-security-1) example. 


### Deploy it

1. `cd api-platform-samples/learn-edge/apikey-security-2`.
2. `./deploy.sh`

### Run it

1. `./invoke.sh` -- Note that the script uses Edge APIs to retrieve the previously generated Consumer key and plugs it into the API requests. 

### Trace it

Go to the Edge UI and run a Trace on this API. Notice that after the API key is verified, a new policy called "Remove API Key" executes. Look at the request sent to the target, the `apikey` query parameter has been removed. 

### About what changed

* We added an Assign Message to the proxy, immediately after the Verify API Key Policy. Hint: it is in the `apiproxy/policies` folder and it is called `RemoveAPIKey.xml`:

    ```xml
        <AssignMessage name="RemoveAPIKey">
          <DisplayName>Remove API Key</DisplayName>
          <Remove>
              <QueryParams>
                  <QueryParam name="apikey"/>
              </QueryParams>
          </Remove>
          <IgnoreUnresolvedVariables>true</IgnoreUnresolvedVariables>
          <AssignTo createNew="false" transport="http" type="request"></AssignTo>
      </AssignMessage>
    ```

  **Assign Message** is one of the most commonly used Edge policies and it can perform a number of different functions. But mainly it's used to add, remove, or modify parts of request and response messages, such as query parameters, message bodies, headers, and so on.

* In the `apiproxy/proxies/default.xml` file, we **attach the policy** immediately after the VerifyAPIKey policy. 

    ```xml
        <ProxyEndpoint name="default">
          <PreFlow>
            <Request>
              <Step>
                <Name>VerifyAPIKey</Name>
              </Step>
              <Step>
                <Name>RemoveAPIKey</Name>
              </Step>
            </Request>
          </PreFlow>
          ...
    ```

### Extra reading: important terms and concepts

* **Order of policy execution:** Note that, as long as there are no errors, policies execute in the order in which they appear in the proxy XML. 

### Things to try

* Change the proxy so that it finds the API key in a header. Then, remove the header using an Assign Message policy. 

### Next step

The next proxy, [fault-handling-1](../fault-handling-1/README.md), shows you how to handle errors and return custom error messages.

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
