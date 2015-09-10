# BaaS application with Node.js on running on Apigee Edge


This cookbook sample illustrates how to create a simple BaaS solution with Node.js
running on Apigee Edge. The service is written entirely in Node.js and it functions
as the target of the API proxy. The app stores and retrieves employee profile
information. The backend data storage is provided by Apigee App Services through 
the Usergrid API. 

For overview information and a detailed discussion of this application, see
the Apigee Edge cookbook topic: 

	http://apigee.com/docs/api-services/content/overview-nodejs-apigee-edge


## Set up


1. Log in to your Apigee Edge account. If you don't have an account, see "Creating
   an Apigee Edge account" here: 
   
      		http://apigee.com/docs/api-services/content/creating-apigee-edge-account

   Accounts are free and only take a minute to set up. 
   
2. After you log in, make sure you remember the name of your organization. You'll need
   it when you configure the service. The org name appears on the Dashboard page when
   you log in.

3. Now, you need to set up the backend data storage (API Services data store). This is
   the storage used by the app to store employee profile data. From the main Dashboard 
   page, open the App Services admin console. 
   
4. In the App Services admin console, create a new Application called "employees". 
   If you need help, see "Creating a New Application
   with the Admin Console": 
   
       http://apigee.com/docs/app-services/content/creating-new-application-admin-console

5. Now, create a Collection in the Data Store. In the Admin Console, click Data and create
   a new Collection called "employees". 


## Sample Configuration


1. Edit the information in ../../setup/setenv.sh for your local environment.

2. Open the file apiproxy/resources/node/config.js for editing. You need to provide values
   for the variables in this config file. The Node.js application reads this file at
   runtime and uses the information in it for authentication. 
   
   Note: The clientId and clientSecret are listed on the App Services Dashboard page.
         Click Org Administration to view these values.
         The username and password must be the user ID and password of the app user you 
         created in the Set Up instructions (e.g., jdoe123/Welcome1). 

   exports.organization = 'yourOrg'  // the name of your organization
   exports.application = 'employees' // the name of the app you created
   exports.clientId = 'xxxxxxx'      // the client ID is listed on the organization Dashboard page in the admin console
   exports.clientSecret = 'xxxxxxx'  // the clientSecret is listed on the organization Dashboard page in the admin console
   exports.tokenExpiration = 60000   // not necessary to change this
   exports.logging = true            // not necessary to change this


## Deploy the app


    ./deploy.sh
    

## Post a new employee profile to the data store. 


   Substitute the name of your organization and the name of the environment to which 
   the application is deployed (the default is "test"):
   
   curl http://{myorg}-{myenv}.apigee.net/employees/profile \
    -H "Content-Type: application/json" \
    -d '{"id":"ajones", "firstName":"Alice", "lastName":"Jones", "phone": "201-555-5501" }' \
    -X POST
   
   
## Retrieve stored profiles with this API call:


   curl "http://{myorg}-{myenv}.apigee.net/employees/profiles"
   
   
## Tip: Using invoke.sh to call the service

You can also run ./invoke.sh to call the API. This script makes a POST and then a 
GET call to the API. It is configured to add a user profile for "ajones", but you
can change the profile information as you wish. 


### Ask the community

[![alt text](../images/apigee-community.png "Apigee Community is a great place to ask questions and find answers about developing API proxies. ")](https://community.apigee.com?via=github)

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
