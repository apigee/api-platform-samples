# Extract target response data and set custom response headers

In this proxy example, we'll extract data from the target response and set the extracted data into custom response headers. Of course, policies do all the work for us. We'll use the ExtractVariables and AssignMessage policies.  


### Provision the required entities

We assume you've provisioned the Product, Developer App, and Developer as explained in proxy-3. If you want to redo it, here's how:

1. `cd api-platform-samples/learn-edge/provisioning`.
2. `./cleanup.sh`.
3. `./setup.sh`.

### Try it

Deploy and invoke the proxy. These are the basic steps:

1. `cd api-platform-samples/tutorials/proxy-6`.
2. `./deploy.sh`
3. `./invoke.sh`
4. Compare the output to the `proxy-5` output. 

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

Of interest: It's a good idea to use a VariablePrefix -- it gets prepended onto the variables that are created by this policy. The JSONPath syntax will be familiar to you only if you know JSON Path. If not, you'll have to take our word that this syntax is used to identify specific data within a JSON object. 

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

* In the `apiproxy/proxies/default.xml` file, we **attach policy** to the ProxyEndpoint. We create a **custom flow** in the endpoint.  

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


### Important words and concepts

* **Custom flows:** Something new in our Learn Edge series. You can create any number of custom flows. If you're confused, go to the Edge UI and observe how the custom flow looks in the Develop tab, and watch what happens in the Trace tool -- it's graphical view helps put these flows into perspective! One thing to note: the Preflow and PostFlow always execute. But custom flows can be conditional. In this example, there are no conditions, so the HandleHeaders flow will always execute.
* **Extracting variables:** The ExtractVariables policy is handy for extracting data from requests and response into flow variables. After the data is extracted, it can be used downstream by any policy capable of reading flow variables. Such variables are commonly used in conditions that further affect flow processing. 

### Things to try

* Try calling another backend service, one you like, and extract data from the response, and return a customized payload. Note, to do this, you'll either have to temporarily remove the VerifyApiKey policy from the proxy or modify the LearnEdgeProduct and add whatever resource you are calling. VerifyAPIKey will only work if the product associated with the API key includes the proxy and resource(s) that are being called. One trick is to specify "/" as the only resource in the Product. This "wildcard" allows any resource path to be called on the proxy. 


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
