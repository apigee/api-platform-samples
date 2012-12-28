# Three-Legged OAuth

This sample shows how use the OAuth 2.0 "authorization code" grant type, which redirects
the end user to a login page, then once the user is authenticated, it returns
an access token. 
It also validates incoming requests using the
access token, and uses an API Product to assign a quota value to each application, and
enforces that quota.

It contains the following policies:

1. An AssignMessage policy to set the "flow.resource.name" variable, which is essential
to API Product processing.
2. An OAuth 2.0 policy to generate the authorization code that is required in order to 
authenticate a user.
3. An OAuth 2.0 policy to generate the access token on a specific URL.
4. An OAuth 2.0 policy to validate the access token for another URL, and to look
up attributes from the API Product associated with the application.
5. A policy to enforce a quota on the number of API calls based on the values set
in the API Product.

# Set up

* The username and password that you use to login to enterprise.apigee.com.
* The name of the organization in which you have an account. Login to 
  enterprise.apigee.com and check account settings.

# Configure 

Update /setup/setenv.sh with your environment details

Configure API products, developers, and apps in your organization:

Run:

/setup/provisioning/setup.sh

# Import and deploy sample project

Run:

/setup/deploy.sh

Testing

$ sh invoke.sh

# Get help

For assistance, post to http://support.apigee.com

Copyright 2012 Apigee Corporation

Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy
of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
