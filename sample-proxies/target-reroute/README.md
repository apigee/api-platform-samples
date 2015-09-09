# Rerouting a target URL

![alt text](../../images/icon-policy-javascript.jpg) ![alt text](../../images/icon_policy_extract-variable.jpg)


### Sample use case

Rewrite a target URL dynamically on Apigee Edge.

### Trace

This screen shot from the [Apigee Edge trace tool](http://apigee.com/docs/api-services/content/using-trace-tool-0) shows the placement of the policies used in this sample. 

![alt text](../../images/target-reroute-trace.png)

### About

This sample API proxy illustrates how to change the target endpoint URL using a JavaScript policy to set the `target.url` flow variable. This variable holds the complete URL for the back-end target endpoint, including any query parameters.  

1. Deploy the proxy. 
1. Send this request to Apigee Edge. 

    **Note:** The proxy is configured with a base path of `/WOEID`. The incoming request must contain that base path or the request will not be processed. Tip: Take a look at the `apiproxy/proxies/default.xml` to see where this base path is configured.

    `curl http://myorg-test.apigee.net/WOEID/2467861`

2. An [Extract Variables policy](http://apigee.com/docs/api-services/reference/extract-variables-policy) extracts the part of the path that comes after the `/WOEID` base path. 

3. The policy stores the value `2467861` in a flow variable called `WOEID.location`. Here is the policy XML:

    ```xml
    <ExtractVariables name="extractId">
        <DisplayName>getWOEIDNumberfromPath</DisplayName>
        <URIPath>
            <Pattern ignoreCase="true">/{location}</Pattern>
        </URIPath>
        <IgnoreUnresolvedVariables>false</IgnoreUnresolvedVariables>
        <VariablePrefix>WOEID</VariablePrefix>
    </ExtractVariables>
    ```


4. A [JavaScript policy](http://apigee.com/docs/api-services/reference/javascript-policy) rewrites the target URL by setting the `target.url` flow variable. This expression also appends the `WOEID.location` value to the query parameter `w`.

    `context.setVariable("target.url", "http://weather.yahooapis.com/forecastrss?w="+context.getVariable("WOEID.location"));`

5. Finally, the newly formed target request is sent to the backend target, the Yahoo weather API, and the weather forecast for the specified locale is returned. 

### Set up, deploy, invoke

See the main project [README](../../README.md) file for information about setting up, deploying, and invoking sample proxies. 

**Policies used in this sample**

* [Extract Variables policy](http://apigee.com/docs/api-services/reference/extract-variables-policy)

* [JavaScript policy](http://apigee.com/docs/api-services/reference/javascript-policy)

**Related information**
* [Apigee JavaScript Object Model](http://apigee.com/docs/api-services/reference/javascript-object-model)

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

