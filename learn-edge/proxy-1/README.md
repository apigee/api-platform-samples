# The simplest proxy

You're going to deploy a simple API proxy on Apigee Edge. Actually, this is the simplest proxy you can make. All it does is return a 200 response to let you know it's working. 

### Try it

All the examples in `learn-edge` work as follows:

1. `cd api-platform-samples/tutorials/proxy-1`.
2. `./deploy.sh` 
    
    It's not important to deconstruct `deploy.sh` now. It just uses a command-line tool to deploy the proxy. 

4. Look at the Edge UI (go to the API Proxies page under the **APIs=>API Proxies** menu) -- you'll see **learn-edge**. 
5. Click **learn-edge**. 
6. Do you see the Overview, Develop, and Trace tabs? Good. Notice in the Overview the Proxy URL is `http://<your org>-test.apigee.net/learn-edge`. This is the URL you will use to call the proxy. 
7. `./invoke.sh`

    This script executes a curl command:

    `curl http://<your org>-test.apigee.net`

Did you get back a Status 200. Great! 

### What you did

You deployed a basic proxy to Edge, called it, and got a 200 response.

### Important words and concepts

* This is the basic file structure for all Edge API proxies. As we'll see in starting with proxy-2, these directories will contain XML files that define how the proxy works. 

```
/apiproxy
   /proxies
   /targets
   /policies
   /resources
   proxyname.xml
```

* This structure is mapped into the Edge UI, although the UI uses slightly different names for the components. 

[add a picture of the navigator]

* Many developers develop proxies locally and deploy them using a command line tool (like the one used in the `./invoke.sh` file) or tools like Maven and Grunt. It's all about properly packaging and uploading the local files to Edge.

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
