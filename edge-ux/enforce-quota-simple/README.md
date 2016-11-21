# Set a quota on the proxy

Enforces a quota on the number of requests made to a proxy. When the number exceeds the quota, requests are refused and the proxy returns a fault message.

With a quota, you can limit the number of API calls in a given period of time. For example, you might offer fee-based quota levels to developers. You can associate quota levels with API Products, for example. A developer might pay a higher fee to obtain an API key associated with a Product that has a higher quota.

### What's interesting about this sample

* A Quota policy limits requests to 1 per minute. You'll find the policy defined in [apiproxy/policies/EnforceQuota.xml](https://github.com/apigee/api-platform-samples/blob/495c7e010dbfc407c5a3187954d3e2fe209c262a/edge-ux/enforce-quota-simple/apiproxy/policies/EnforceQuota.xml#L1-L8).

 This policy specifies that no more than one request per minute may be satisfied. For requests beyond one per minute, a fault is returned.

 ```xml
<Quota name="EnforceQuota">
      <DisplayName>Enforce Quota</DisplayName>
      <FaultRules/>
      <Properties/>
      <Interval>1</Interval>
      <TimeUnit>minute</TimeUnit>
      <Allow count="1"/>
</Quota>
    ```

* Code in the [apiproxy/proxies/default.xml](https://github.com/apigee/api-platform-samples/blob/495c7e010dbfc407c5a3187954d3e2fe209c262a/edge-ux/enforce-quota-simple/apiproxy/proxies/default.xml#L4-L6) file **attaches the policy** to the ProxyEndpoint's Preflow. 

 ```
<PreFlow>
      <Request>
        <Step>
          <Name>EnforceQuota</Name>
        </Step>
      </Request>
  </PreFlow>
    ```
### Extra reading: important terms and concepts

* [**Quota policy**](http://docs.apigee.com/api-services/reference/quota-policy) enforces a limit on the number of API calls that can be made in an interval of time. 
* **Quota-specific flow variables** are set automatically when the Verify API Key policy executes successfully. They reflect the values set in the Product associated with an API key.

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
