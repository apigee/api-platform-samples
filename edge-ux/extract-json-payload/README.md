# Extract response data and set response headers

Extracts values from response data coming from a target, then assigns those values to custom headers included in the response to the client.

### What's interesting about this sample

* The proxy's [**ExtractVariables policy**](http://docs.apigee.com/api-services/reference/extract-variables-policy) extracts values from firstName and lastName objects in the JSON and assigns the values to flow variables. You'll find the policy implementation in the `apiproxy/policies` folder and it is called [ParseJsonResponse.xml](https://github.com/apigee/api-platform-samples/blob/cef869211a5722cc56c59834a07ff17ffdc3f54f/edge-ux/extract-json-payload/apiproxy/policies/ParseJsonResponse.xml).

 Like the [AssignMessage policy](http://docs.apigee.com/api-services/reference/assign-message-policy), ExtractVariables is one of the most commonly used policies. With it, you can extract data from requests and responses and store it in flow variables.

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

 It's a good idea to use a VariablePrefix in this policy -- it gets prepended onto the variable names that are created by this policy. The JSONPath syntax will be familiar to you only if you know JSON Path. If not, just know that this syntax is used to identify specific data within a JSON object. The incoming JSON is very simple to parse, so the JSON Path isn't very complicated. 

* An [**AssignMessage policy**](http://docs.apigee.com/api-services/reference/assign-message-policy) grabs the variables extracted by the ExtractVariables policy and stores them in custom headers. It is in the `apiproxy/policies` folder and it is called [AssignCustomHeaders.xml](https://github.com/apigee/api-platform-samples/blob/cef869211a5722cc56c59834a07ff17ffdc3f54f/edge-ux/extract-json-payload/apiproxy/policies/AssignCustomHeaders.xml):

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

 The Header tags specify the names of message headers to create, where the flow variable values are assigned as header values. These are the same variables extracted from the payload by the ExtractVariables policy. Pay attention to the syntax used in this policy for the variables. They must be enclosed in curly braces. 

* The **AssignMessage policy is attached** to the ProxyEndpoint in the [apiproxy/proxies/default.xml](https://github.com/apigee/api-platform-samples/blob/cef869211a5722cc56c59834a07ff17ffdc3f54f/edge-ux/extract-json-payload/apiproxy/proxies/default.xml#L8-L13) file. The **custom flow** HandleHeaders. You can see it listed when you look at this proxy in the Edge UI. 

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

* [**Custom flows:**](http://docs.apigee.com/api-services/content/understanding-flows-and-resources) You can create any number of custom flows. If you're confused, go to the Edge UI and observe how the custom flow looks in the Develop tab, and watch what happens in the Trace tool -- it's graphical view helps put these flows into perspective! One thing to note: the Preflow and PostFlow always execute. But custom flows can be conditional (like our FaultRule flow as conditional back in `fault-handling-intro`). In this example, there are no conditions, so the HandleHeaders flow will always execute.
* [**Extracting variables:**](http://docs.apigee.com/api-services/reference/extract-variables-policy) The ExtractVariables policy is handy for extracting data from requests and response into flow variables. After the data is extracted, it can be used downstream by any policy capable of reading flow variables. Such variables are commonly used in conditions that further affect flow processing. 

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
