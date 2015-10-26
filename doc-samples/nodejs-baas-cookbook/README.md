# Mediate between Edge and API BaaS with Node.js

### Sample use case

Deploy a Node.js target app on Apigee Edge that performs CRUD operations in an API BaaS data store. 

### About

This sample illustrates how to use a Node.js target app deployed to Edge that communicates with a back-end data store. This is a pattern that you can use to mediate between Edge and any other back-end data store -- it doesn't have to be specific to BaaS. 

For overview information and a detailed discussion of this application, see
the Apigee Edge cookbook topic: 

[http://apigee.com/docs/api-services/content/overview-nodejs-apigee-edge](http://apigee.com/docs/api-services/content/overview-nodejs-apigee-edge)


### Set up, deploy, invoke

See the main project [README](../../README.md) file for information about setting up, deploying, and invoking sample proxies. The README walks you through what you need to do to deploy and run any of the samples. 

#### Additional configurations

You need to do a few simple configs to get things set up on API BaaS:

* After logging in to Apigee, select API BaaS from the menu in the upper-right corner of the main Apigee Edge screen. 

* In the API BaaS admin portal, [create a new application](http://apigee.com/docs/api-services/cookbook/building-baas-service-nodejs) called employees. 

* In the API BaaS admin portal, [create a new data store](http://apigee.com/docs/app-services/content/creating-collections) called employees. 

* Edit the API BaaS credentials in the `./apiproxy/resources/node/config.js` file. You can find your clientSecret and clientId values on the **Org Administration** page of the API BaaS Admin Portal. For example: 

  ```
  exports.organization = 'myorg'
  exports.application = 'employees'
  exports.clientId = 'b3U6gjxoiwin4gEeOaDDwafXLGg'
  exports.clientSecret = 'b3U6JAorOoLMn0bE02uuJrls2x40p78'
  exports.tokenExpiration = 60000
  exports.logging = true
  ```
   
   
After you deploy, you can run `./invoke.sh` to call the APIs for posting and fetching data from the back-end store. 


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
