# Catch an error and return a custom error response

Handles the error that occurs when an API key is invalid. Handling faults is how you manage or communicate errors inside a proxy.

This example adds **error handling** to a proxy. It checks for an invalid API key and returns a **custom error message**. This pattern -- evaluating a condition (in this case, an error condition) and taking subsequent action -- is one of the most fundamental patterns in Edge proxy development. 

### What's interesting about this sample

* This sample knows how to handle a bad API key. When the API key sent by a client app is invalid, the sample returns an error message to the client.

* Its **FaultRule** element in the Proxy Endpoint defines the condition that provokes its execution. You'll see it in [apiproxy/proxies/default.xml](https://github.com/apigee/api-platform-samples/blob/master/edge-ux/fault-handling-apikey/apiproxy/proxies/default.xml#L3-L8):

    ```xml
    <ProxyEndpoint name="default">
      <FaultRules>
        <FaultRule name="InvalidApiKey">
            <Step>
                <Name>InvalidApiKey</Name>
            </Step>
            <Condition>(fault.name Matches "InvalidApiKey") </Condition>
        </FaultRule>
      </FaultRules>
      ...
    ```

 A fault rule is a special kind of flow that executes whenever a policy throws an error. When an error occurs, Edge shifts control directly to the "fault rule flow." The VerifyApiKey policy can throw errors upon several conditions, like an invalid API key, for example. That's exactly what our fault rule is looking for! When the fault rule's condition is true, a policy called InvalidApiKey (in [apiproxy/policies/InvalidApiKey.xml](https://github.com/apigee/api-platform-samples/blob/master/edge-ux/fault-handling-apikey/apiproxy/policies/InvalidApiKey.xml)) executes. 

* The proxy contains an **Assign Message policy** (in the [apiproxy/policies/InvalidApiKey.xml](https://github.com/apigee/api-platform-samples/blob/master/edge-ux/fault-handling-apikey/apiproxy/policies/InvalidApiKey.xml) file):

    ```xml
    <AssignMessage async="false" continueOnError="false" enabled="true" name="InvalidApiKey">
        <DisplayName>Invalid ApiKey Message</DisplayName>
        <Properties/>
        <Set>
          <Payload contentType="application/json">\{"error": \{"message":"{fault.name}", "detail":"Please provide valid API key in the apikey query parameter.}} </Payload>
          <StatusCode>400</StatusCode>
          <ReasonPhrase>BadRequest</ReasonPhrase>
        </Set>
        <IgnoreUnresolvedVariables>true</IgnoreUnresolvedVariables>
        <AssignTo createNew="false" transport="http" type="response"/>
    </AssignMessage>
    ```


 This policy is a little more complicated looking, but it's simple to understand. When called, it sets the response body (payload) to a string value -- a custom error message. It also sets a status code and reason phrase. This information is what the client app will receive if it sends an invalid API key to Edge, as you saw when you invoked this example.
 
### Extra reading: important terms and concepts

* [**Fault rules**](http://docs.apigee.com/api-services/content/fault-handling#creatingfaultrules) Enable you to do error handling within the proxy flow pipline. They are a lot like any flow in the pipeline, but they only execute when an policy throws an error and when the fault rule's condition evaluates to true. 
* [**Conditional flows**](http://docs.apigee.com/api-services/content/flow-configurations#aboutconditionalflows) allow you to control how Edge processes a proxy dynamically. Usually a condition tests the value of a flow variable that was set by another policy or flow event. 
* [**Assign Message policy**](http://docs.apigee.com/api-services/reference/assign-message-policy) is one of the most commonly used policies in Apigee Edge! It's used to set request and response headers, query parameters, and form parameters, as well as body payloads, and much more. It's kind of a Swiss Army Knife policy -- it does a lot of different things!

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
