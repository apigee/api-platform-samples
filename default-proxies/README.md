# Default API proxies

This directory contains the default API proxies that are provided with every 
organization on Apigee Edge. If you create an account on Apigee Edge, and 
then you log in to the Edge management UI, you will see these two API 
proxies in your organization.

They are:

* **helloworld** -- A simple API proxy that sends requests to Apigee's `http://mocktarget.apigee.net` sample target, which returns a variety of sample responses. The API proxy includes a Quota policy and an Assign Message policy that provides CORS support.
* **oauth** -- An OAuth endpoint for generating access tokens with the client credentials grant type. 

We provide them here for convenience. If you need to reset to 'factory settings' you can simply deploy the API proxies provided here.

### Ask the community

[![alt text](../images/apigee-community.png "Apigee Community is a great place to ask questions and find answers about developing API proxies. ")](https://community.apigee.com?via=github)

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
