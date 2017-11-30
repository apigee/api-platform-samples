# Test for a specific target service error

In this Learn Edge example, we'll make a service callout and check the HTTP status code returned from the target service. If the target throws a 404 response, we'll use the Raise Fault policy to return a custom error message. 

### Prerequisites

Be sure to perform the [prerequisites](https://github.com/apigee/api-platform-samples/tree/master/learn-edge#prerequisites) if you haven't already. 

(Optional) We recommend you try out the [service-callout-1](../service-callout-1) before doing this example. 

### Provision the required entities

We assume you've provisioned the Product, Developer App, and Developer as explained in `apikey-security`. If you want to redo it, here's how:

1. `cd api-platform-samples/learn-edge/provisioning`.
2. `./cleanup.sh`.
3. `./setup.sh`.

### Deploy it

1. `cd api-platform-samples/learn-edge/service-callout-2`.
2. `./deploy.sh`

### Run it

1. `./invoke.sh`
4. Note that a custom error message is returned. 

### Trace it

Go to the Edge UI and run a Trace on this API. 

### About what changed

This example builds somewhat on [service-callout-1](../service-callout-1). Here's what changed:

In this example, we intentionally make a bad call to the target service -- we change the Assign Message policy to call a resource that does not exist `/make-error`. In this case, the target service will return a 404 response. 

```xml
    <AssignMessage name="AM-BuildRequest">
        <AssignTo createNew="true" type="request">myrequest</AssignTo>
        <IgnoreUnresolvedVariables>false</IgnoreUnresolvedVariables>
        <Set>
            <Path>/make-error</Path>
        </Set>
        <AssignVariable>
            <Name>target.copy.pathsuffix</Name>
            <Value>false</Value> 
        </AssignVariable>
    </AssignMessage>
```


We added a Raise Fault policy. When triggered, this policy throws the proxy into the error flow and returns a custom error message. 

```xml
    <RaiseFault async="false" continueOnError="false" enabled="true" name="RF-RaiseCustomFault">
        <DisplayName>RF-RaiseCustomFault</DisplayName>
        <Properties/>
        <FaultResponse>
            <Set>
                <Payload contentType="application/json">\{&quot;error&quot;: \{&quot;message&quot;:&quot;Page Not Found&quot;, &quot;details&quot;:&quot;Hello from Learn Edge! This is a custom message..}} </Payload>
                <StatusCode>404</StatusCode>
                <ReasonPhrase>Page not found.</ReasonPhrase>
            </Set>
        </FaultResponse>
        <IgnoreUnresolvedVariables>true</IgnoreUnresolvedVariables>
    </RaiseFault>
```

We then added this Fault Rule to catch the error. It is triggered when the response from the target has a status code of "404":

```xml
    <FaultRule name="SC-Error">
          <Condition>(fault.name Matches "ExecutionFailed") </Condition>
          <Step>
              <Name>RF-RaiseCustomFault</Name>
              <Condition>(mockresponse.status.code = "404") </Condition>
          </Step>
      </FaultRule>
```


### Important terms and concepts

* The [Raise Fault](http://docs.apigee.com/api-services/reference/raise-fault-policy) policy lets you perform custom exception handling. It's commonly used to define a fault message that is returned to the requesting app when a specific condition arises. 

### Things to try

* You can build on the pattern used in this proxy to trap any kind of error returned from the target service. Remember that the Service Callout policy throws an ExecutionFailed error when (by default) it gets back a 4xx or 5xx error from the target service.


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
