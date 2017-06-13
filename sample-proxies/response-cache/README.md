# Response Caching

![alt text](https://github.com/apigee/api-platform-samples/blob/master/images/icon_policy_traffic-management.jpg)
### Note about usage

This sample API proxy calls the Yahoo weather API as its backend target. Since this sample was created, this API began requiring an API key. To execute this sample, you'll need to obtain a key and add modify the proxy to use it.  

### Sample use case

Cache data retrieved from a backend resource in order to reduce calls to that resource.

### About

Cache (for 10 minutes) weather forecasts from a backend weather service.

### Set up, deploy, invoke

See the main project [README](../../README.md) file for information about setting up, deploying, and invoking sample proxies. 

### More information

* [Response Cache policy](http://apigee.com/docs/api-services/reference/response-cache-policy)
* [Caching in Edge](http://apigee.com/docs/api-services/content/caching-edge)
* [Support for HTTP response headers](http://apigee.com/docs/api-services/content/http-response-caching)

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
