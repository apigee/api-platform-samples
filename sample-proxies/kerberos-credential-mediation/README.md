# Access Entity

This sample shows how to retrieve profiles for entities from the Apigee Edge
datastore. Using this policy, you can retrieve profiles for things like
apps, developers, and API products. Sometimes you need this information 
to enable dynamic behavior in policies or code running on Apigee Edge.

This example shows you how to get a developer's email address based on 
the API key that is presented by the app (that is, the 'invoke.sh' script).

Complete documentation for this policy can found here:

http://apigee.com/docs/api-services/content/retrieve-entity-profiles-using-accessentity

# Set up

* The username and password that you use to login to enterprise.apigee.com.
* The name of the organization in which you have an account. Login to 
  enterprise.apigee.com and check account settings.
* A valid API key for any app in your organization on Apigee Edge.

# Configure 

Update `/setup/setenv.sh` with your environment details
Update 'invoke.sh' with a valid API key for an app in your organization.

# Import and deploy sample project

To deploy, run `$ sh deploy.sh`

To test, run `$ sh invoke.sh`

# Get help

For assistance, please use [StackOverflow](http://stackoverflow.com/tags/apigee) and add the tag "apigee".

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
