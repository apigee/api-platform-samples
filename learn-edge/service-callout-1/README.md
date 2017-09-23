# Make a service callout

In this Learn Edge example, we'll use the Service Callout policy to call an external service, get back a response, and process the response by extracting data from it and setting custom headers.  

### Prerequisites

Be sure to perform the [prerequisites](https://github.com/apigee/api-platform-samples/tree/master/learn-edge#prerequisites) if you haven't already. 

### Provision the required entities

We assume you've provisioned the Product, Developer App, and Developer as explained in `apikey-security`. If you want to redo it, here's how:

1. `cd api-platform-samples/learn-edge/provisioning`.
2. `./cleanup.sh`.
3. `./setup.sh`.

### Deploy it

1. `cd api-platform-samples/learn-edge/service-callout-1`.
2. `./deploy.sh`

### Run it

1. `./invoke.sh`
4. Note that two custom headers are returned "x-firstName" and "x-lastName". 

### Trace it

Go to the Edge UI and run a Trace on this API. 

### About what changed

This proxy is a refactor of the [extract-json-payload](../extract-json-payload) proxy. In extract-json-payload, we called the mocktarget service, got back a response, extracted data from the response, and set custom headers. 

In this example, we remove the TargetEndpoint from the proxy and call the target directly using a Service Callout policy:

```xml
    <ServiceCallout name='ServiceCalloutGetMockResponse'>
        <DisplayName>ServiceCallout.GetMockResponse</DisplayName>
        <Request variable="myrequest">
        </Request>
        <Response>mockresponse</Response>
        <Timeout>30000</Timeout>
        <HTTPTargetConnection>
          <URL>http://mocktarget.apigee.net</URL>
        </HTTPTargetConnection>
    </ServiceCallout>
```

Notice that the policy has a target URL, much like the target you'd specify in a Target Endpoint!

Two other important things to notice about this policy:

* It takes a Request variable. As we'll see next, we use an Assign Message policy to create it. 
* It sets a Response variable. This is the variable that we'll process further down the line when we extract response data and set headers. 

Immediately before the Service Callout policy executes, we use Assign Message to save a custom request object. Our requirement is simple -- just set the proxy path suffix using the `<Set>/<Path>` element. The suffix will be added to the target URL set in the Service Callout policy.

**Important**: Note the use of `<AssignVariable>` to set `target.copy.pathsuffix` to `false`. This is required! If you don't set it to false, then the pathsuffix from the target URL will be copied instead.

```xml
    <AssignMessage name="AM-BuildRequest">
        <AssignTo createNew="true" type="request">myrequest</AssignTo>
        <IgnoreUnresolvedVariables>false</IgnoreUnresolvedVariables>
        <Set>
            <Path>/json</Path>
        </Set>
        <AssignVariable>
            <Name>target.copy.pathsuffix</Name>
            <Value>false</Value> 
        </AssignVariable>
    </AssignMessage>
```

* In the `apiproxy/proxies/default.xml` file, we attach the Assign Message and Service callout policies to the Proxy Endpoint Preflow as follows: 

    ```xml
        ...
          <PreFlow>
            <Request>
              <Step>
                <Name>VerifyAPIKey</Name>
              </Step>
              <Step>
                <Name>AM-BuildRequest</Name>
              </Step>
              <Step>
                <Name>ServiceCalloutGetMockResponse</Name>
              </Step>
            </Request>
        ...
    ```


### Things to try

* Configure the proxy to call the mocktarget service with the `/user` path and `?user` query parameter. Hint: Configure the Assign Message policy to create the appropriate request.


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
