# Extract XML from request payload

In this Learn Edge example, we'll extract XML data from the request body. Then, we'll return the extracted data in a custom XML response body. This example demonstrates how to use XPath notation in an Extract Variables policy.

### Prerequisites

Be sure to perform the [prerequisites](https://github.com/apigee/api-platform-samples/tree/master/learn-edge#prerequisites) if you haven't already. 

### Provision the required entities

We assume you've provisioned the Product, Developer App, and Developer as explained in `apikey-security`. If you want to redo it, here's how:

1. `cd api-platform-samples/learn-edge/provisioning`.
2. `./cleanup.sh`.
3. `./setup.sh`.

### Deploy it

1. `cd api-platform-samples/learn-edge/extract-xml-payload`.
2. `./deploy.sh`

### Run it

1. `./invoke.sh`
4. Note that the response body is XML and contains data extracted from the request.

### Trace it

Go to the Edge UI and run a Trace on this API. You can see Extract Variables executes and the custom response body is populated. 

### About what changed

* We added an **ExtractVariables policy** to extract XML data from the request. The policy uses XPath notation to identify the data to extract. Note the use of namespacing in the XPaths. You must declare any namespaces that you use in the XPath in the `<Namespaces>`` element. The policy is in the `apiproxy/policies` folder and it is called `ExtractDirectionsInfo.xml`:

    ```xml
        <ExtractVariables name="ExtractDirectionInfo">
            <Source>request.content</Source>
            <VariablePrefix>direction_info</VariablePrefix>
            <XMLPayload>
                <Namespaces>
                    <Namespace prefix="dir">urn:43BFF88D-D204-4427-B6BA-140AF393142F</Namespace>
                </Namespaces>
                <Variable name="status" type="string">
                    <XPath>/dir:Directions/dir:status/text()</XPath>
                </Variable>
                <Variable name="travelmode" type="string">
                    <XPath>/dir:Directions/dir:route/dir:leg/dir:step/@mode</XPath>
                </Variable>
                <Variable name="duration" type="string">
                    <XPath>/dir:Directions/dir:route/dir:leg/dir:step/dir:duration/dir:value/text()</XPath>
                </Variable>
                <Variable name="timeunit" type="string">
                    <XPath>/dir:Directions/dir:route/dir:leg/dir:step/dir:duration/dir:text/text()</XPath>
                </Variable>
            </XMLPayload>
            <DisplayName>Extract Direction Info</DisplayName>
        </ExtractVariables>
    ```

* We added another **ExtractVariables policy** to extract XML data from another request. The thing to notice is that we use two namespace ids in this policy. The policy is in the `apiproxy/policies` folder and it is called `ExtractDirectionsInfo.xml`:

    ```xml
        <ExtractVariables name="ExtractCompanyId">
            <Source>request</Source>
            <IgnoreUnresolvedVariables>false</IgnoreUnresolvedVariables>
            <XMLPayload>
                <Namespaces>
                    <Namespace prefix="S">http://schemas.xmlsoap.org/soap/envelope/</Namespace>
                    <Namespace prefix="ns1">urn:xxxx.xxxx.xxxxx.com</Namespace>
                </Namespaces>
                <Variable name="companyId" type="string">
                    <XPath>/S:Envelope/S:Body/ns1:login/ns1:credential/ns1:companyId/text()</XPath>
                </Variable>
            </XMLPayload>
            <DisplayName>Extract Company Id</DisplayName>
        </ExtractVariables>
    ```


* We added two **AssignMessage policies** to build custom XML responses for each set of extracted data. They are also in the `apiproxy/policies` folder and are called `AssignCompanyIdPayload.xml` and `AssignDirectionInfoPayload.xml`. Here's `AssignDirectionInfoPayload.xml`. 

    ```xml
        <AssignMessage name='AssignDirectionsPayload'>
          <AssignTo createNew="false" type="response"/>
          <Set>
            <Payload contentType='application/xml'>
                <root>
                    <status>{direction_info.status}</status>
                    <mode>{direction_info.travelmode}</mode>
                    <duration>{direction_info.duration}</duration>
                    <timeunit>{direction_info.timeunit}</timeunit>
                </root>
            </Payload>
          </Set>
          <IgnoreUnresolvedVariables>true</IgnoreUnresolvedVariables>
          <DisplayName>Assign Directions Payload</DisplayName>
        </AssignMessage>
    ```


### Extra reading: important terms and concepts

* **XPath:** When extracting data from an XML payload, you must use XPath notation. If you're XML includes namespaces, you must declare them in the Extract Variables policy. 

### Things to try

* Configure the proxy to extract data from another XML payload of your choosing. Hint: You'll need to modify the Extract Variables and Assign Message policies. 

### Next step

The next proxy, [quota-1](../quota-1/README.md), sets a quota limit on the number of API calls that can be made in a given time period.


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
