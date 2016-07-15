# Secure the proxy with an API key

**Important concepts**: This proxy illustrates perhaps **the** central concept you need to know about in Apigee Edge: how API Proxies, API Products, and Developer Apps are **related** and how this relationship allows proxies to be secured with keys (and, as we'll see later, managed in other ways).  

### Provision these entities

Run this script to provision an API Product, Developer, and Developer App to Edge. Don't worry about what these things are just yet -- after playing with this proxy, you will begin to understand them:

1. `cd api-platform-samples/learn-edge/provisioning`

    **Note:** It's optional, but feel free to examine the script. It uses Apigee Edge Management APIs to upload the entities to Edge. That's why you're required to enter your Apigee password -- it is required whenever you use the management APIs. 

2. Run `./setup.sh.

3. Go to the Edge UI and look at these uploaded entities under the Publish menu: Publish=>Products, Publish=>Developers, and Publish=>Developer Apps.

4. Look at the Developer App (Learn Edge App). Notice that it *has* both a Developer and a Product (Learn Edge Product). It also *has* two keys, a Consumer Key and a Consumer Secret. 

5. Click the Product link in the app page. Notice that the product *has* an API proxy (`learn-edge`). Also, notice that it *has* a resource (`/json`). The Product, Developer, and Developer App form a relationship that enables you to secure and manage proxies. 

Enough with the concepts. Let's do something.

### Try it

Deploy and invoke the proxy. These are the basic steps:

1. `cd api-platform-samples/tutorials/proxy-3`.
2. `./deploy.sh`
3. `./invoke.sh`
4. Compare the output to the `proxy-2` output. 

### About what changed

* We added our first **policy** to the proxy. Hint: it is in the `apiproxy/policies` folder and it is called `VerifyApiKey.xml`:

    ```xml
        <VerifyAPIKey name="VerifyAPIKey">
          <!-- This policy checks the query param "apikey" against the Consumer Keys in all the Developer Apps defined in our organization.-->
            <APIKey ref="request.queryparam.apikey"/>
        </VerifyAPIKey>
    ```

* In the `apiproxy/proxies/default.xml` file, we **attach the policy** to the ProxyEndpoint's Preflow. Just remember that the Preflow is the first flow that is executed when a new request comes in to Apigee Edge. So, the first thing that happens on Edge is that it checks to see if the API key is valid.

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

 

### Important words and concepts

* **Policies** are a big deal in Apigee Edge. They let you specifiy any actions that you want to perform while the API call is flowing through Edge. In this case, we are implementing a **security action**: verifying the API key. If it's valid the request moves on. If invalid, an error is returned to the calling client.
* **Flows** are very important. Basically, when a request comes in to Edge, it's processed through a sort of pipeline. The pipeline has multiple stages called flows, and at each stage you can attach policies that do all sorts of things like enforce security, check for threats, enforce quotas, do transformations, read and write state variables, and so on. 
* **Products, Developer Apps, and Developers**. These entities form a relationship that allows you to control who can access your API proxies. More specifically, they allow you to control which **apps** can access your Proxies. 


### Things to try

* In a browser, hit http://mocktarget.apigee.net/help to see what else the service can do.

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
