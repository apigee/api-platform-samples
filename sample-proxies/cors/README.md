#CORS Implementation 

This sample demonstrates how you can use the CORS policy to 
support browsers CORS request. 

Cross-Origin Resource Sharing (CORS) is a W3C spec that allows cross-domain communication from the browser. 
By building on top of the XMLHttpRequest object, CORS allows developers to work with the same idioms as same-domain requests.

The use-case for CORS is simple. 
Imagine the site abc.com has some data that the site xyz.com wants to access. This type of request traditionally wouldn’t be allowed under the browser’s same origin policy. 
However, by supporting CORS requests, abc.com can add a few special response headers that allows xyz.com to access the data.

As you can see from this example, CORS support requires coordination between both the server and client. 
In the Add-CORS policy , there is a Access-Control-Allow-Headers where we have added an additional entry 'X-Custom-CORS' apart from standard Allow Headers . 



# Configure 

Update `/setup/setenv.sh` with your environment details

# Import and deploy sample project

To deploy, run `$ sh deploy.sh`

To test via curl, run `$ sh invoke.sh` 

Additionally you can test CORS with javascript. 
Please edit the index.html file and look for org and env variable . Change it with your settings.

Put it in any web server and access it as
http://localhost/demo/index.html 


Trace the functionality in API Management Portal .
You will see two requests - The first one being the OPTIONS request and then the GET request.
Look for Origin Header , OPTION request and some response headers set by OPTIONS request.


# Get help

For assistance, post to the [Apigee Developer Forum](http://support.apigee.com)

Copyright © 2013 Apigee Corporation

Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy
of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
