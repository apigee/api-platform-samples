# Secure the proxy with an API key

Verifies that requests carry the client app's unique identifier, an API key. Verifying API keys is a fundamental security feature.

### What's interesting about this sample

* This sample expects -- and checks for -- an API Key in requests. An API key is a value that uniquely identifies a client application. By requiring a predefined API key value with requests, an API proxy helps ensure that requests are coming from an authorized client.

* In the proxy code, the API key check is done by a Verify API Key policy. The policy is configured in [VerifyApiKey.xml](https://github.com/apigee/api-platform-samples/blob/master/edge-ux/basic-apikey-security/apiproxy/policies/VerifyApiKey.xml):

    ```xml
    <VerifyAPIKey name="VerifyAPIKey">
      <!-- This policy checks the query param "apikey" against the Consumer Keys in all the Developer Apps defined in our organization.-->
        <APIKey ref="request.queryparam.apikey"/>
    </VerifyAPIKey>
    ```

  Notice that this policy looks for an API key in a query parameter called `apikey`? You can read about this policy (and all policies) [in the Edge docs](http://docs.apigee.com/api-services/reference/verify-api-key-policy).

* The policy is attached to the proxy via the proxy's [apiproxy/proxies/default.xml](https://github.com/apigee/api-platform-samples/blob/master/edge-ux/basic-apikey-security/apiproxy/proxies/default.xml#L2-L8) file. It's attached at the ProxyEndpoint's Preflow, which executes for each new request. So, the first thing that happens on Edge is that it checks to see if the API key is valid.

    ```xml
    <ProxyEndpoint name="default">
      <PreFlow>
        <Request>
          <Step>
            <Name>VerifyAPIKey</Name>
          </Step>
        </Request>
      </PreFlow>
      ...
    ```

* This example illustrates one of the most important concepts you need to know about in Apigee Edge: **how API Proxies, API Products, and Developer Apps are related** and how this relationship allows proxies to be secured with keys. After you deploy and execute this proxy, you'll have a basic understanding of these important concepts. 

### Extra reading: important terms and concepts

* [**Policies**](http://docs.apigee.com/api-services/reference/reference-overview-policy) are a big deal in Apigee Edge. They let you specifiy any actions that you want to perform while the API call is flowing through Edge. In this case, we are implementing a **security action**: verifying the API key. If it's valid the request moves on. If invalid, an error is returned to the calling client.
* [**Flows**](http://docs.apigee.com/api-services/content/understanding-flows-and-resources) are very important. Basically, when a request comes in to Edge, it's processed through a sort of pipeline. The pipeline has multiple stages called flows, and at each stage you can attach policies that do all sorts of things like enforce security, check for threats, enforce quotas, do transformations, read and write state variables, and so on. 
* **[Products](http://docs.apigee.com/developer-services/content/what-api-product), [Developer Apps](http://docs.apigee.com/developer-services/content/creating-apps-surface-your-api#whatisadeveloperapp), and [Developers](http://docs.apigee.com/developer-services/content/adding-developers-your-api-product)**. These entities form a relationship that allows you to control who can access your API proxies. More specifically, they allow you to control which **apps** can access your Proxies. 

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
