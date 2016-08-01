# Secure the proxy with an API key

In this Learn Edge example you will add API Key security to a proxy. This example illustrates one of the most important concepts you need to know about in Apigee Edge: **how API Proxies, API Products, and Developer Apps are related** and how this relationship allows proxies to be secured with keys. After you deploy and execute this proxy, you'll have a basic understanding of these important concepts. 

### Prerequisites

Be sure to perform the [prerequisites](https://github.com/apigee/api-platform-samples/tree/master/learn-edge#prerequisites) if you haven't already.

### Do this quick, one-time setup

Run this script to provision an API Product, Developer, and Developer App to Edge. Don't worry about what these things are just yet -- after playing with this proxy, you will begin to understand them:

1. `cd api-platform-samples/learn-edge/provisioning`

    **Note:** It's optional, but feel free to examine the script. It uses Apigee Edge Management APIs to upload the entities to Edge. That's why you're required to enter your Apigee password -- it is required whenever you use the management APIs.

2. Note that a Consumer key is returned from the provisioning script. This key will be used later when we call the API proxy. 

3. Run `./setup.sh`.

4. Go to the Edge UI and look at these uploaded entities under the Publish menu: **Publish->Products**, **Publish->Developers**, and **Publish->Developer Apps**.

5. Look at the Developer App (called "Learn Edge App"). Notice that it has both a Developer **and** a Product (Learn Edge Product). It also has two keys, a Consumer Key and a Consumer Secret. You have to click **Show** to see these key values. Note that the Consumer key is the same value that was returned when you ran the provisioning script. You can always get the key from the UI if you need to. 

6. Click the **Product** link in the app page. Notice that the product has an API proxy (`learn-edge`). Also, notice that it has two resources: `/json` and `/xml`. This means that for the proxy `learn-edge`, only resource paths `/json` and `xml` will succeed when API key security is enforced. Attempts to call the proxy with any other resource paths will be rejected.

Enough with the concepts. Let's do something.

### Deploy it

1. `cd api-platform-samples/learn-edge/apikey-security`.
2. `./deploy.sh`

### Run it

1. `./invoke.sh` -- Note that the script uses Edge APIs to retrieve the previously generated Consumer key and plug it into the API requests. 
4. Compare the output to the `proxy-to-a-target` output. 

### Trace it

Go to the Edge UI and run a Trace on this API. How does it differ from the Trace you saw in `proxy-to-a-target`? Do you see where the VerifyAPIKey policy exectued? Click the policy icon in the Transaction map and notice that when it executed, a whole bunch of variables were created and appear in the Phase Details panel -- they have names like `verifyapikey.VerifyAPIKey.status` and `verifyapikey.VerifyAPIKey.expires_in`. For now, just note that these variables are created. 

### About what changed

* We added our first **policy** to the proxy. Hint: it is in the `apiproxy/policies` folder and it is called `VerifyApiKey.xml`:

    ```xml
        <VerifyAPIKey name="VerifyAPIKey">
          <!-- This policy checks the query param "apikey" against the Consumer Keys in all the Developer Apps defined in our organization.-->
            <APIKey ref="request.queryparam.apikey"/>
        </VerifyAPIKey>
    ```

  Can you see that this policy looks for an API key in a query parameter called `apikey`? You can read about this policy (and all policies) [in the Edge docs](http://docs.apigee.com/api-services/reference/verify-api-key-policy). 

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

### Extra reading: important terms and concepts

* **Policies** are a big deal in Apigee Edge. They let you specifiy any actions that you want to perform while the API call is flowing through Edge. In this case, we are implementing a **security action**: verifying the API key. If it's valid the request moves on. If invalid, an error is returned to the calling client.
* **Flows** are very important. Basically, when a request comes in to Edge, it's processed through a sort of pipeline. The pipeline has multiple stages called flows, and at each stage you can attach policies that do all sorts of things like enforce security, check for threats, enforce quotas, do transformations, read and write state variables, and so on. 
* **Products, Developer Apps, and Developers**. These entities form a relationship that allows you to control who can access your API proxies. More specifically, they allow you to control which **apps** can access your Proxies. 


### Things to try

* In a browser, hit http://mocktarget.apigee.net/help to see what else the service can do.
* Change the VerifyAPIKey policy so that it looks for the API key in a different query parameter. Change it so it looks for the key in a header. **Hint:** Go to the Edge documentation for this policy to see how to use headers instead of query parameters for the key. It's a very simple change.

### Next step

The next proxy, [fault-handling-1](../fault-handling-1/README.md), shows you how to handle errors and return custom error messages.

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
