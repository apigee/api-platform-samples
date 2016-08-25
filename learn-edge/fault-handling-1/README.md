# Catch an error and return a custom error response

In this Learn Edge example, we will add **error handling** to a proxy. We'll check for an invalid API key and return a **custom error message**. This pattern -- evaluating a condition (in this case, an error condition) and taking subsequent action -- is one of the most fundamental patterns in Edge proxy development. 

### Prerequisites

Be sure to perform the [prerequisites](https://github.com/apigee/api-platform-samples/tree/master/learn-edge#prerequisites) if you haven't already.

### Provision the required entities

We assume you've provisioned the Product, Developer App, and Developer as explained in `apikey-security-1`. If you want to redo it, here's how:

1. `cd api-platform-samples/learn-edge/provisioning`.
2. `./cleanup.sh`.
3. `./setup.sh`.

### Deploy it

1. `cd api-platform-samples/learn-edge/fault-handling-1`.
2. `./deploy.sh`

### Run it 
1. `./invoke.sh`
4. Compare the output to output from the previous lessons. 

### Trace it

Go to the Edge UI and run a Trace on this API. How does it differ from the Trace you saw in `apikey-security-1` and `apikey-security-2`? Can you see where the fault occurs and where control shifts to the error flow? 

### About what changed

* We added a **FaultRule** to the Proxy Endpoint. You'll see it in `apiproxy/proxies/default.xml`:

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

A fault rule is a special kind of flow that executes whenever a policy throws an error. When an error occurs, Edge shifts control directly to the "fault rule flow." The VerifyApiKey policy can throw errors upon several conditions, like an invalid API key for example. That's exactly what our fault rule is looking for! When the fault rule's condition is true, a policy called InvalidApiKey executes. 

* We added an **Assign Message policy** to the proxy. Hint: it is in the `apiproxy/policies` folder and it is called `InvalidApiKey.xml`:

    ```xml
        <AssignMessage async="false" continueOnError="false" enabled="true" name="InvalidApiKey">
            <DisplayName>Invalid ApiKey Message</DisplayName>
            <Properties/>
            <Set>
                <Payload contentType="application/json">\{"error": \{"message":"{fault.name}", "detail":"Hello from Learn Edge: Please provide valid API key in the apikey query parameter.}} </Payload>
                <StatusCode>400</StatusCode>
                <ReasonPhrase>BadRequest</ReasonPhrase>
            </Set>
            <IgnoreUnresolvedVariables>true</IgnoreUnresolvedVariables>
            <AssignTo createNew="false" transport="http" type="response"/>
        </AssignMessage>
    ```


This policy is a little more complicated looking, but it's simple to understand. When called, it sets the response body (payload) to a string value -- a custom error message. It also sets a status code and reason phrase. This information is what the client app will receive if it sends an invalid API key to Edge, as you saw when you invoked this example.
 

### Extra reading: important terms and concepts

* **Fault rules** Enable you to do error handling within the proxy flow pipline. They are a lot like any flow in the pipeline, but they only execute when a policy throws an error and when the fault rule's condition evaluates to true. 
* **Conditional flows** allow you to control how Edge processes a proxy dynamically. Usually a condition tests the value of a flow variable that was set by another policy or flow event. 
* **Assign Message policy** is one of the most commonly used policies in Apigee Edge! It's used to set request and response headers, query parameters, and form parameters, as well as body payloads, and much more. It's kind of a Swiss Army Knife policy -- it does a lot of different things!

### Things to try

* Configure the proxy to return a custom error message when this default error response is thrown:

  `{"fault":{"faultstring":"Failed to resolve API Key variable request.queryparam.apikey","detail":{"errorcode":"steps.oauth.v2.FailedToResolveAPIKey"}}`

   Hint: Trap the fault name FailedToResolveAPIKey in another fault rule. How do you cause that error? Try calling the API without the `apikey` query parameter. Like this:  `curl http://<your-org>-test.apigee.net/learn-edge/json`. The error means that variable where Edge is looking to find the API key does not exist (it can't be resolved).


### Next step

The next proxy, [fault-handling-2](../fault-handling-2/README.md), illustrates that you can have multiple fault rules in a proxy and the order in which fault rules execute.
   
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
