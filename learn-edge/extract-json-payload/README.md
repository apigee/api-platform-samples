# Extract target response data and set custom response headers

In this Learn Edge example, we'll extract data from the target response and set the extracted data into custom response headers. It's not hard to do, and policies do all the work for us. We'll use the Extract Variables and Assign Message policies. These two policies are often used together and are two of the most commonly used policies in Apigee Edge. 

### Prerequisites

Be sure to perform the [prerequisites](https://github.com/apigee/api-platform-samples/tree/master/learn-edge#prerequisites) if you haven't already. 

### Provision the required entities

We assume you've provisioned the Product, Developer App, and Developer as explained in `apikey-security`. If you want to redo it, here's how:

1. `cd api-platform-samples/learn-edge/provisioning`.
2. `./cleanup.sh`.
3. `./setup.sh`.

### Deploy it

1. `cd api-platform-samples/learn-edge/extract-json-payload`.
2. `./deploy.sh`

### Run it

1. `./invoke.sh`
4. Compare the output to the `response-cache` output. 

### Trace it

Go to the Edge UI and run a Trace on this API. You can see Extract Variables executes and the custom headers are populated. 

### About what changed

* We added an **ExtractVariables policy** to the proxy. Like AssignMessage, this is one of the most commonly used polices among Edge developers. It lets you extract data from requests and responses and store it in flow variables. It is in the `apiproxy/policies` folder and it is called `AssignCustomHeaders.xml`:

    ```xml
        <ExtractVariables name="ParseJsonResponse">
            <IgnoreUnresolvedVariables>true</IgnoreUnresolvedVariables>
            <VariablePrefix>mock</VariablePrefix>
            <JSONPayload>
                <Variable name="firstName">
                    <JSONPath>$.firstName</JSONPath>
                </Variable>
                <Variable name="lastName">
                    <JSONPath>$.lastName</JSONPath>
                </Variable>
            </JSONPayload>
        </ExtractVariables>
    ```

Of interest: It's a good idea to use a VariablePrefix in this policy -- it gets prepended onto the variable names that are created by this policy. The JSONPath syntax will be familiar to you only if you know JSON Path. If not, you'll have to take our word that this syntax is used to identify specific data within a JSON object. It's a really simple JSON to parse, so the JSON Path isn't very complicated. 

* We added another **AssignMessage policy** to the proxy. It grabs the variables we extracted and stores them in custom headers. It is in the `apiproxy/policies` folder and it is called `AssignCustomHeaders.xml`:

    ```xml
        <AssignMessage name="AssignCustomHeaders">
            <AssignTo createNew="false" type="response"/>
            <IgnoreUnresolvedVariables>true</IgnoreUnresolvedVariables>
            <Set>
                <Headers>
                    <!-- Variables populated by parsing JSON response with an ExtractVariables policy -->
                    <Header name="x-firstName">{mock.firstName}</Header>
                    <Header name="x-lastName">{mock.lastName}</Header>
                </Headers>
            </Set>
        </AssignMessage>
    ```

    Note of interest: The Header tags specify the names of the headers we want to create and the names of the flow variables to extract those names from. These are the same variables we just extracted from the payload. Pay attention to the syntax used in this policy for the variables. They must be enclosed in curly braces. 

* In the `apiproxy/proxies/default.xml` file, we **attach the Assign Message policy** to the ProxyEndpoint. Note that we create a **custom flow** in the endpoint. The custom flow is called HandleHeaders. You can see it listed when you look at this proxy in the Edge UI. 

    ```xml
        ...
        <Flows>
            <Flow name="HandleHeaders">
              <Response>
                <Step>
                    <Name>ParseJsonResponse</Name>
                </Step>
                <Step>
                    <Name>AssignCustomHeaders</Name>
                </Step>
              </Response>
              <Request/>
            </Flow>
        </Flows>
        ...
    ```


### Extra reading: important terms and concepts

* **Custom flows:** Something new in our Learn Edge series. You can create any number of custom flows. If you're confused, go to the Edge UI and observe how the custom flow looks in the Develop tab, and watch what happens in the Trace tool -- it's graphical view helps put these flows into perspective! One thing to note: the Preflow and PostFlow always execute. But custom flows can be conditional (like our FaultRule flow as conditional back in `fault-handling-intro`). In this example, there are no conditions, so the HandleHeaders flow will always execute.
* **Extracting variables:** The ExtractVariables policy is handy for extracting data from requests and response into flow variables. After the data is extracted, it can be used downstream by any policy capable of reading flow variables. Such variables are commonly used in conditions that further affect flow processing. 

### Things to try

* Try calling another backend service, extract data from the response, and return a customized payload. Note, to do this, you'll need to remove the VerifyAPIKey policy temporarily. Or, you'll have to add the resource you are calling to the API product (Learn Edge Product). 

### Next step

The next proxy, [extract-json-payload-2](../extract-json-payload-2/README.md), illustrates a clever use of the Extract Variables policy that extracts a data from a JSON response based on a query string. 


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
