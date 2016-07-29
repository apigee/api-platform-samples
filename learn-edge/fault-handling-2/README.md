# The order in which fault rules execute

In this sample, we illustrate that fault rules have a specific order in which they execute. TL;DR: The last fault rule that evaluates to TRUE in a chain of rules is the one that executes.


### Provision the required entities

We assume you've provisioned the Product, Developer App, and Developer as explained in `apikey-security`. If you want to redo it, here's how:

1. `cd api-platform-samples/learn-edge/provisioning`.
2. `./cleanup.sh`.
3. `./setup.sh`.

### Try it

Deploy and invoke the proxy. These are the basic steps:

1. `cd api-platform-samples/learn-edge/fault-handling-intro`.
2. `./deploy.sh`
3. `./invoke.sh`
4. See which error message is returned for each query parameter value. Hint: The winner is the LAST Fault Rule that evalulates to true, in the order in which the rules appear in the XML.

### View it in the Edge UI

Go to the Edge UI and run a Trace on this API. How does it differ from the Trace you saw in `apikey-security`? You can see where the fault occurs and where control shifts to the error flow. 

### About what changed

* We added three Fault Rules to the Proxy Endpoint. They check the truth value of a query parameter. You'll see it in `apiproxy/proxies/default.xml`:

    ```xml
        ...
        <FaultRules>
        <FaultRule name="InvalidApiKey">
            <Step>
                <Name>InvalidApiKeyMessage</Name>
            </Step>
            <Condition>(fault.name Matches "InvalidApiKey") </Condition>
        </FaultRule>
        <FaultRule name="BadParam-A">
            <Step>
                <Name>CatchBadParam-A</Name>
            </Step>
            <Condition>(request.queryparam.bad-param-A Matches "true") </Condition>
        </FaultRule>
        <FaultRule name="BadParam-B">
            <Step>
                <Name>CatchBadParam-B</Name>
            </Step>
            <Condition>(request.queryparam.bad-param-B Matches "true") </Condition>
        </FaultRule>
         <FaultRule name="BadParam-C">
            <Step>
                <Name>CatchBadParam-C</Name>
            </Step>
            <Condition>(request.queryparam.bad-param-C Matches "true") </Condition>
        </FaultRule>
      </FaultRules>
      ...
    ```

When an invalid key is sent, the proxy goes into the Error Flow and the Fault Rules are evaluated. The LAST Fault Rule that evaluates to TRUE executes. 

* We added an **Assign Message policy** for each of the fault conditions -- they just return a message to tell the user which Fault Rule exectued. Hint: they are in the `apiproxy/policies` folder and are called `CatchBadParam-A.xml`, `CatchBadParam-B.xml`, `CatchBadParam-C.xml`:
 

### Extra reading: important terms and concepts

* **Fault rules: order of execution** When the proxy goes into the Error Flow, the Fault Rules are evaluated. The LAST Fault Rule that evaluates to TRUE executes. 


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
