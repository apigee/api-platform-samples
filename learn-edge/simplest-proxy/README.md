# The simplest proxy

In the first Learn Edge project, you will deploy a simple API proxy on Apigee Edge. Actually, this is the simplest proxy you can make -- it doesn't actually do anything! All it does is return a 200 response to let you know it's working. 

### Prerequisites

Be sure to perform the [prerequisites](https://github.com/apigee/api-platform-samples/tree/master/learn-edge#prerequisites) if you haven't already.

### Try it

Follow these steps to deploy and call the API proxy:

**Final reminder:** You must have [apigeetool](https://www.npmjs.com/package/apigeetool) installed on your machine. The deployment script uses this utility to deploy the Edge proxies. 

1. Edit this file with your Apigee account information (org name, etc). You only have to do this once. (You do this in the Prerequisites above.)

    `api-platform-samples/tools/setup/setenv.sh`

2. `cd api-platform-samples/learn-edge/simplest-proxy`.

3. `./deploy.sh` 
    
    It's not important to deconstruct `deploy.sh` now. It just uses a command-line tool to deploy the proxy. 

4. `./invoke.sh`

    This script executes this curl command, where "your org name" is the name of your Apigee Edge organization and "your environment" is the name of the environment to deploy to. These values are the values you set in `api-platform-samples/tools/setup/setenv.sh`.

    `curl http://<your org name>-<your environment>.apigee.net/v1/learn-edge`

5. Look at the output.

    Did you get back a Status 200? Great! It worked. In [proxy-to-a-target](./proxy-to-a-target), we'll make a few simple changes so the proxy calls an actual backend service.

### View it in the Edge UI

In every Learn Edge example, we'll remind you to take a look at the Edge UI. Here are the basic steps that you'll repeat again and again:

1. Log in to your Apigee account. 
2. Go to **APIs->API Proxies**. 
5. Click the proxy named **learn-edge**. 
6. You're in the **Overview** tab. Notice that the Proxy URL is `http://<your org name>-test.apigee.net/v1/learn-edge`. This is the URL you will use to call the proxy. 
7. Click the **Develop** tab. This is the "visual representation" of the proxy you deployed. It's also the UI-based development environment. 
8. Click the **Trace** tab. Click **Start Trace** and send a request. 

**Hint:** Trace is a valuable tool for debugging proxies. It shows you what's happening while requests and responses pass through the Edge pipeline.

### What you did

You deployed a basic proxy to Edge, called it, and got a 200 response. This may seem trivial, but you accomplished several important tasks. You deployed an Edge proxy from your work computer to Edge, you called the API proxy, and got back meaningful output. You also poked around the Edge UI and ran a Trace. 

### Extra reading: Important terms and concepts

* An **API proxy** is an API that fronts for another API. Client apps call the proxy API, and Edge then handles tasks like security and calling the backend target services. Edge also provides a rich analytics service so you can monitor and track your APIs. 
* The basic file structure for all Edge API proxies is shown below; however, in this "simplest-proxy" example, targets, policies, and resources are empty directories, because they aren't used. In later examples, these other directories, and their contents, will be important. 

   ```
   /apiproxy
      /proxies
      /targets
      /policies
      /resources
      proxyname.xml
   ```

* This file structure is mapped into the Edge UI, although the UI uses slightly different names for the components. 

[add a picture of the navigator]

* Many developers develop proxies locally and deploy them using a command line tool (like the one used in the `./deploy.sh` file) or tools like Maven and Grunt. It's all about properly packaging and uploading the local files to Edge. You can even package a proxy in a ZIP file and upload it through the Edge UI. 

### Next step

The next proxy, [proxy-to-a-target](../proxy-to-a-target/README.md), returns data from a backend service. 

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
