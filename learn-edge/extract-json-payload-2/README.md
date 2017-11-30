# Query for data in a JSON response payload

This Learn Edge example demonstrates a technique to find and extract data from a JSON payload based on a query string. In this case, we pass the query string as a request parameter, and we use some clever coding in the Extract Variables policy to extract the data we queried for. 

For example, assume a target service returns this JSON response:

```
    [ {
      "name" : "pod1",
      "region" : "us-east-1"
    }, {
      "name" : "pod2",
      "region" : "us-west-2"
    } ]
```

The goal of this example is to configure an Extract Variables policy to extract the name of a "pod" given the name of a "region". So, if we pass "us-west-2" as a query parameter, the policy will extract the value "pod2" and return that value to the client. 

### Prerequisites

Be sure to perform the [prerequisites](https://github.com/apigee/api-platform-samples/tree/master/learn-edge#prerequisites) if you haven't already. 

### Provision the required entities

We assume you've provisioned the Product, Developer App, and Developer as explained in `apikey-security`. If you want to redo it, here's how:

1. `cd api-platform-samples/learn-edge/provisioning`.
2. `./cleanup.sh`.
3. `./setup.sh`.

### Deploy it

1. `cd api-platform-samples/learn-edge/extract-json-payload-2`.
2. `./deploy.sh`

### Run it

1. `./invoke.sh`
4. Note that a set of custom headers are returned. They all start with `x-`.  

### Trace it

Go to the Edge UI and run a Trace on this API. Can you see that these custom response headers are set?

* `x-first-pod-name-as-string`
* `x-all-pod-names-as-array`
* `x-all-region-names-as-array`
* `x-queried-pod-name-as-array`
* `x-queried-pod-name-as-string`


### About what changed

* Here's the Extract Variables policy that we use to extract a JSON property name given a value. This policy illustrates several ways to parse the JSON, as explained in the comments. The main thing to notice in this example is the pattern used to extract pod names based on the query parameter `request.queryparam.region`.

    ```xml
        <ExtractVariables name="EV-Parse-Json-Response">
            <IgnoreUnresolvedVariables>true</IgnoreUnresolvedVariables>
            <JSONPayload>
                <Variable name="mp_pod_name_val">
                    <JSONPath>$.[0].name</JSONPath>            <!-- Returns first value pod1 -->
                </Variable>
                <Variable name="mp_pod_names">
                    <JSONPath>$.[*].name</JSONPath>            <!-- Returns array ["pod1","pod2"] -->
                </Variable>
                <Variable name="mp_pod_regions">
                    <JSONPath>$.[*].region</JSONPath>          <!-- Returns array ["us-east-1","us-west-2"] -->
                </Variable>
                <Variable name="desired_mp_pod_name">
                    <JSONPath>$.[?(@.region=='{request.queryparam.region}')].name</JSONPath>             <!-- Returns specific value as array ["pod1"] -->
                </Variable>
                <Variable name="desired_mp_pod_name_val">
                    <JSONPath>$.[?(@.region=='{request.queryparam.region}')].name[0]</JSONPath>             <!-- Returns specific value as string pod1 -->
                </Variable>
            </JSONPayload>
        </ExtractVariables>
    ```



* As you'll see, we fake the JSON response with a Assign Message policy just for the purpose of illustration -- to give us something to work with. It is in the `apiproxy/policies` folder and it is called `AM-SetSampleResponse.xml`. 

* Finally, we add an **AssignMessage policy** to the proxy that grabs the extracted variables and stores them in custom headers. It is in the `apiproxy/policies` folder and it is called `AM-Set-Custom-Response.xml`:

    ```xml
        <AssignMessage name="AM-Set-Custom-Response">
            <AssignTo createNew="false" type="response"/>
            <IgnoreUnresolvedVariables>true</IgnoreUnresolvedVariables>
            <Set>
                <Headers>
                    <!-- Variables populated by parsing JSON response with an ExtractVariables policy -->       
                    <Header name="x-first-pod-name-as-string">{desired_mp_pod_name_val}</Header>
                    <Header name="x-all-pod-names-as-array">{mp_pod_names}</Header>
                    <Header name="x-all-region-names-as-array">{mp_pod_regions}</Header>
                    <Header name="x-queried-pod-name-as-array">{desired_mp_pod_name}</Header>
                    <Header name="x-queried-pod-name-as-string">{mp_pod_name_val}</Header>            
                </Headers>
            </Set>
            <Set>
                <Payload contentType="application/json" variablePrefix="@" variableSuffix="#">
                        {"name":"@request.queryparam.region#", "region":"@desired_mp_pod_name_val#"}
                </Payload>
            </Set>
        </AssignMessage>
    ```

    **Note of interest:** When setting the JSON payload, we need to specify a variable prefix and suffix to replace the curly braces that are required when specifying Edge variables. 

* In the `apiproxy/targets/default.xml` file, we attach the policies to the PostFlow Response of the target endpoint. We set the "fake" JSON response, then parse it, then set custom response headers. 

    ```xml
        ...
        <PostFlow name="PostFlow">
            <Request/>
            <Response>
                <Step>
                    <Name>AM-Set-Sample-Response</Name>
                </Step>
                <Step>
                    <Name>EV-Parse-Json-Response</Name>
                </Step>   
                <Step>
                    <Name>AM-Set-Custom-Response</Name>
                </Step>       
            </Response>
        </PostFlow>
        ...
    ```


### Things to try

* Try invoking the API with different "region" parameters.
* Configure a Fault Rule to return a custom error message if the query parameter does not match any region in the JSON. See the Learn Edge Fault Rule examples to get started. 
* Try parsing the JSON response from an real external service (instead of the "fake" response created by the `AM-SetSampleResponse.xml` policy). 
* Experiment with extracting queried data from an XML payload instead of JSON (to get started, try the `extract-xml-payload` example).

### Next step

The next proxy, [extract-xml-payload](../extract-xml-payload/README.md), extracts data from an XML request payload and returns it in a custom XML response body. 


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
