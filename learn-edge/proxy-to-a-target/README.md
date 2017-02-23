# Proxy to a target service

In this Learn Edge example, we will extend the first proxy "do-nothing" proxy so that it calls an actual backend target service. This proxy does actual work!

### Prerequisites

Be sure to perform the [prerequisites](https://github.com/apigee/api-platform-samples/tree/master/learn-edge#prerequisites) if you haven't already.

### Deploy it

1. `cd api-platform-samples/learn-edge/proxy-to-a-target`.
2. `./deploy.sh`

### Run it
1. `./invoke.sh`
2. Compare the output to the `simplest-proxy` output. 

### Trace it

Go to the Edge UI and run a Trace on this API. How does it differ from the Trace you saw in the first Learn Edge example, `simplest-proxy`?

**What's a revision?** You might notice that when you deployed `proxy-to-a-target` you created a new revision of the proxy with the name `learn-edge`. In all of the `deploy.sh` files, the proxy name is always `learn-edge`. The deploy script just creates a new revision each time it deploys. If you want to go back to a previous revision, you can go to the Edge UI and select it from the **Revision** menu. Or, you can just redeploy whichever proxy you want to use from the command-line -- and it will become the current revision. If you have trouble invoking a proxy, check in the UI to be sure the current revision is deployed. 

### About what changed

To get our proxy to call a target service, we made a few changes to the simple do-nothing proxy we deployed before. 

* In the [apiproxy/proxies/default.xml](./apiproxy/proxies/default.xml) file, we modified the `<RouteRule>` element.  

  **Tip:** It might help if you open these files and look at them in their entirety.

   ```xml
   <RouteRule name="default">
        <!-- This connects our proxy to the target defined in apiproxy/targets/default.xml -->
        <TargetEndpoint>default</TargetEndpoint>
   </RouteRule>
   ```

    The `name` attribute (set to `default`) is arbitrary and can be anything you wish. The `<TargetEndpoint>` element refers to a TargetEndpoint definition. It must exist and have the name "default". Read on to learn about the TargetEndpoint!

* We defined the TargetEndpoint in a file called [apiproxy/targets/default.xml](./apiproxy/targets/default.xml). In that file, we added this XML block, which specifies the target of the proxy, an HTTP web service called `mocktarget.apigee.net`.

   ```xml
   <TargetEndpoint name="default">
      <HTTPTargetConnection>
        <!-- This is where we define the target. For this sample we just use a simple URL. -->
        <URL>http://mocktarget.apigee.net</URL>
      </HTTPTargetConnection>
   </TargetEndpoint>
   ```

    >Note: The name of the TargetEndpoint (`default`) is important -- it is the name referred to in the `<RouteRule>` element in `apiproxy/proxies/default.xml`. In our configuration, the Route Rule references the Target Endpoint called `default`. 

### What you did

You deployed a modified proxy that calls a backend target -- an HTTP web service at `http://mocktarget.apigee.net`. 

### Extra reading: important terms and concepts

* **Target service** -- A backend service to which the proxy routes requests. In this example, we proxied to a service called `http://mocktarget.apigee.net`. 
* **RouteRule** -- Specifies which target endpoint definition will be called. Route rules can have logic to route calls conditionally to different targets. In this example, we only have one target called `default`.
* **TargetEndpoint** -- The name of a target endpoint definition. Target endpoints are defined in the `apiproxy/targets` directory. 
* **HTTPTargetConnection** -- Specifies an HTTP web service. This is the target service called by the proxy.

### Other things to try

* In a browser, hit http://mocktarget.apigee.net/help to see what else the service can do. 
* Modify the `invoke.sh` script to hit one of the other resources. For example: `curl http://<your org>-test.apigee.net/v1/learn-edge/json`. 

  **Notable Concept**: By default, whatever you add to the base path of the API proxy gets passed to the target unchanged. 

* Try changing the proxy to call another REST-based backend service of your choosing. Test the change by redeploying and invoking the proxy. Hint: Edit `apiproxy/targets/default.xml`.

### Next step

The next proxy, [apikey-security](../apikey-security-1/README.md), secures the API proxy with an API key.


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
