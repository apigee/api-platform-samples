# The order in which fault rules execute

In this Learn Edge example, we illustrate that Fault Rules have a specific order in which they execute:

* When the fault rule is in the Proxy Endpoint, Edge evaluates the fault rules BOTTOM to TOP (physically in the XML block), and the **first** fault rule that evaluates to **true** in a chain of rules is the one that executes. 
* When the fault rule is in the Target Endpoint, Edge evaluates the fault rules TOP to BOTTOM (physically in the XML block), the **first** fault rule that evaluates to **true** exectues. 

This is an important pattern that trips up a lot of new Apigee Edge developers. This example builds on the example in [fault-handling-1](../fault-handling-1/README.md).

### Prerequisites

Be sure to perform the [prerequisites](https://github.com/apigee/api-platform-samples/tree/master/learn-edge#prerequisites) if you haven't already.

### Provision the required entities

We assume you've provisioned the Product, Developer App, and Developer as explained in [apikey-security-1](../apikey-security-1/README.md). If you want to redo it, here's how:

1. `cd api-platform-samples/learn-edge/provisioning`.
2. `./cleanup.sh`.
3. `./setup.sh`.

### Deploy it

1. `cd api-platform-samples/learn-edge/fault-handling-2`.
2. `./deploy.sh`

### Run it

2. `./invoke.sh`
4. The error responses are of interest. To understand them, it'll take a little digging into the code, but it'll be worth it! We'll explain more below. 

### Trace it

Go to the Edge UI and run a Trace on this API. After running `invoke.sh`, there should be three separate traces, one for each API call. Click through them. 

Here's what we want you to notice about the trace sessions:

* First API call: The API flows normally, calls the target, and returns a response. 
* Second API call: An error is thrown in the Proxy Endpoint. 
* Third API call: An error is thrown in the Target Endpoint. 

### About what changed

* We added a Raise Fault policy to the proxy. This is a policy that, when it executes, it throws the proxy into an Error state. We do this so that the Fault Rules will be evaluated. 

* We added three Fault Rules to the **Target Endpoint**. They check the truth value of a query parameter. You'll see it in `apiproxy/targets/default.xml`:

    ```xml
        ...
        <FaultRules>
            <FaultRule name="BadParam-X">
                <Step>
                    <Name>CatchBadParam-X</Name>
                </Step>
                <Condition>(queryparam.X Matches "true") </Condition>
            </FaultRule>
            <FaultRule name="BadParam-Y">
                <Step>
                    <Name>CatchBadParam-Y</Name>
                </Step>
                <Condition>(queryparam.Y Matches "true") </Condition>
            </FaultRule>
             <FaultRule name="BadParam-Z">
                <Step>
                    <Name>CatchBadParam-Z</Name>
                </Step>
                <Condition>(queryparam.Z Matches "true") </Condition>
            </FaultRule>
        </FaultRules>
      ...
    ```


* We added an **Assign Message policy** for each of the fault conditions -- they just return a message to tell the user which Fault Rule exectued. Hint: they are in the `apiproxy/policies` folder and are called `CatchBadParam-X.xml`, `CatchBadParam-Y.xml`, `CatchBadParam-Z.xml`:
 
* A little slight-of-hand: we added an Assign Message policy to the Proxy Endpoint to set the X, Y, and Z query parameters (if they are passed in the request) to flow variables. We do this because the request.queryparam.<paramname> variables only persist in the request flow. We need to have these variables show up in the Target Response flow, so we stash them in variables that will be available there.

### Look at the code

This sample is a little more complicated than previous ones, but it isn't hard to understand. We use conditions that check for certain query parameter values to trigger fault rules. We also conditions to trigger the Raise Fault policy. The best way to understand how this proxy works is to look carefully at the code, try it out, and use the Trace tool to see how it looks in runtime.

### Things to try

Call the API with some of the query parameters set to different true/false values and see the difference in Trace.

### Extra reading: important terms and concepts

* **Fault rules: order of execution** When the proxy goes into the Error Flow, the Fault Rules are evaluated. If the error occurs in the Proxy Endpoint, Edge evaluates the fault rules BOTTOM to TOP (physically in the XML block), and the FIRST Fault Rule that evaluates to TRUE executes. If the error occurs in the Target Endpoint, Edge evaluates the fault rules TOP to BOTTOM (physically in the XML block), and the FIRST Fault Rule that evaluates to TRUE executes. 


### Next step

The next proxy, [response-cache-1](../response-cache-1/README.md), illustrates you can have multiple fault rules in a proxy and the order in which fault rules execute.
   
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
