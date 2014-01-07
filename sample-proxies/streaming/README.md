# HTTP Streaming

This sample demonstrates an API proxy configured for HTTP streaming. 

The ProxyEndpoint and TargetEndpoint are configured to stream HTTP 
request and response messages.

In the default configuration, HTTP processing on the API Platform is 
asynchronous and non-blocking. 

While processing HTTP messages, the Apigee gateway does not need to:

- Allocate a single thread per request message
- Block threads while waiting for I/O

Thus, in the default configuration, the API Platform supports AJAX 
and long-polling with no additional configuration.

However, when developing apps that rely on architectures like Comet, 
you need to explicitly configure HTTP streaming, as is demonstrated by 
this sample API proxy. 

This is accomplished by configuring the Endpoints using pre-defined 
properties.

See the API Platform reference:

http://apigee.com/docs/enterprise/content/endpoint-properties-reference

In this sample API proxy, you can see these settings in 
'/proxies/default.xml' and '/targets/default.xml'.

# Configure 

Update `/setup/setenv.sh` with your environment details

# Import and deploy sample project

To deploy, run `deploy.sh`

To test, run `$ sh invoke.sh`

# Get help

For assistance, post to the [Apigee Developer Forum](http://support.apigee.com)

Copyright © 2014 Apigee Corporation

Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy
of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
