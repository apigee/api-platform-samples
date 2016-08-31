# Secure the proxy with an API key

In this Learn Edge example we secure an API proxy using an API key.  

### Prerequisites

Be sure to perform the [prerequisites](https://github.com/apigee/api-platform-samples/tree/master/learn-edge#prerequisites) if you haven't already.

### Do this quick, one-time setup

Run this script to provision an API Product, Developer, and Developer App to Edge. Don't worry about what these things are just yet -- after playing with this proxy, you will begin to understand them:

1. `cd api-platform-samples/learn-edge/provisioning`

3. Run `./setup.sh` and follow the prompts.

    **Note:** It's optional, but feel free to examine the script. It uses Apigee Edge Management APIs to upload the entities to Edge. That's why you're required to enter your Apigee password -- it is required whenever you use the management APIs.

4. Note that a **Consumer key**, a random string of numbers and letters, is returned from the provisioning script. This is the key that we'll use later to secure the API proxy. Later, you'll see exactly where the key comes from.

### Deploy it

1. `cd api-platform-samples/learn-edge/apikey-security-1`.
2. `./deploy.sh`

### Run it

1. `./invoke.sh` -- Note that the script uses Edge APIs to retrieve the previously generated Consumer key and plug it into the API requests. 
4. Compare the output to the `proxy-to-a-target` output. 

### Trace it

Go to the Edge UI and run a Trace on this API. How does it differ from the Trace you saw in `proxy-to-a-target`? Do you see where the VerifyAPIKey policy executed? Click the policy icon in the Transaction map and notice that when it executed, a whole bunch of variables were created and appear in the Phase Details panel -- they have names like `verifyapikey.VerifyAPIKey.status` and `verifyapikey.VerifyAPIKey.expires_in`. For now, just note that these variables are created. 

### About what changed

* We added our first **policy** to the proxy! Hint: it is in the `apiproxy/policies` folder and it is called `VerifyApiKey.xml`:

    ```xml
        <VerifyAPIKey name="VerifyAPIKey">
            <APIKey ref="request.queryparam.apikey"/>
        </VerifyAPIKey>
    ```

  You can guess that this policy looks for an API key in a query parameter called `apikey`, which is exactly how we called the API when we invoked it.

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

* **API Product Logic** - This is an important concept in Edge development. When the VerifyAPIKey policy executes, a whole chain of logic executes behind the scenes. It goes something like this:

  1. The Verify API Key policy executes.
  2. Edge locates the Developer App that has that API key. 

      In our case, the app is called Learn Edge App. You can find it in the Edge UI. Under the Publish menu, select Developer Apps. Then select Learn Edge App. Take a look at it now if you wish. You can see the API key if you click the **Show** button for the Consumer Key.

  2. Edge iterates through the list of Products in the App (there must be at least one, and there can be many). 
  3. Edge checks that the proxy path information in a Product matches the incoming API call. 
  4. The first Product that matches is used to set a bunch of context variables in the proxy flow. You can see them if you click the VerifyAPIKey policy in the Trace tool! They have names like `verifyapikey.VerifyAPIKey.issued_at`.
  6. If any of these checks fail, proxy processing stops and an error is returned. 
  6. If the checks succeed, Edge continues processing the proxy request. 

* **Policies** let you specify any operations that you want to perform while the API call is flowing through Edge. In this case, we are implementing a **security policy**. As we'll see in later lessons, there are policies for enforcing quotas, caching, fault handling, and many many others. 
* **Flows** -- When a request comes in to Edge, it's processed through a sort of pipeline. The pipeline has multiple stages called flows, and at each stage you can attach policies that do all sorts of things like enforce security, check for threats, enforce quotas, do transformations, read and write state variables, execute conditional logic, and so on. 
* **Products, Developer Apps, and Developers** -- These entities form a relationship that allows you to control access to your API proxies.
* You can read about the Verify API Key policy (and all policies) [in the Edge docs](http://docs.apigee.com/api-services/reference/verify-api-key-policy).


### Things to try

* In a browser, hit http://mocktarget.apigee.net/help to see what else the service can do.
* Change the VerifyAPIKey policy so that it looks for the API key in a different query parameter. Change it so it looks for the key in a header. **Hint:** Go to the Edge documentation for this policy to see how to use headers instead of query parameters for the key. It's a very simple change.
* In the Trace tool, examine all the variables that are populated when the policy executes. What variables are populated if the policy fails (if you pass an invalid key)?

### Next step

The next proxy, [apikey-security-2](../apikey-security-2/README.md), shows you how to remove the API key query parameter from the request to the backend target. 

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
