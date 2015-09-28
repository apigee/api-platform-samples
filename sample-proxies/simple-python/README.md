# Python Script Sample

### Sample use case

Execute a Python script in an API flow. 

### Policies 

This sample uses this policy: 

* ![alt text](../../images/icon_policy_python.jpg "Python Script policy") Python Script: To set response headers. The policy is set on the target response flow.
 

### About

>Note: This policy is not available with Apigee Edge Free (free, non-expiring license). See [Apigee Edge Pricing Features](http://apigee.com/about/pricing/apigee-edge-pricing-features). To enable this policy in your environment, contact [Apigee Support](https://community.apigee.com/content/apigee-customer-support).

This very simple example executes a Python script that adds a response header to the API. The proxy calls an API to get the weather for Palo Alto, CA.

The Python script just sets a response header to the value of a flow variable:

```
response.setVariable("header.X-Apigee-Demo-target", flow.getVariable("target.url"));
print 'Reached the script & assigned header variable' 
```

After invoking the proxy, you'll see that special response header was added:

`X-Apigee-Demo-target: http://weather.yahooapis.com/forecastrss?w=12797282`


### Set up, deploy, invoke

See the main project [README](../../README.md) file for information about setting up, deploying, and invoking sample proxies. 


### More information

**Policies used in this sample**

* [Python Script policy](http://apigee.com/docs/api-services/reference/python-script-policy)

### Ask the community

[![alt text](../../images/apigee-community.png "Apigee Community is a great place to ask questions and find answers about developing API proxies. ")](https://community.apigee.com?via=github)

---

Copyright © 2015 Apigee Corporation

Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy
of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.