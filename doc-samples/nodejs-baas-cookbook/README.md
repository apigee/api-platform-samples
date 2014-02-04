## BaaS application with Node.js on running on Apigee


This cookbook sample illustrates how to create a simple BaaS application with Node.js 
funtioning as the API backend. The application lets you store and retrieve employee
profile information. Apigee App Services provides the cloud-based data storage. 

For overview information and a detailed discussion of this application, see
the Apigee Edge cookbook topic: http://apigee.com/docs


## To set up:

1. You need an account and an organization on Apigee Edge. 
2. Go to the App Services main page, and create a new app called "employees".
3. Create a new user in your org in App Servivces. For the example, this user's ID is "jdoe". 
4. Edit the information in ../../tools/setenv.sh for your local environment. 
5. Edit the file apiproxy/resources/node/config.js. The clientId and clientSecret are 
   listed on the main page for your environment in App Services. 

   exports.organization = 'myorg'
   exports.application = 'employees'
   exports.clientId = 'xxxxxxxxxxxxxx'
   exports.clientSecret = 'yyyyyyyyyyyyy'
   exports.username = 'jdoe'
   exports.password = 'Welcome1'
   exports.tokenExpiration = 60000
   exports.logging = true 

 
## To deploy:

    ./deploy.sh

## To run:

    ./invoke.sh


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
