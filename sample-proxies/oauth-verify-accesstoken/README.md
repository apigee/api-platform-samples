# Three-Legged OAuth

This sample shows how use the OAuth 2.0 AccessToken is used to access a protected resource.
It also validates incoming requests using the access token, and 
uses an API Product to assign a quota value to each client and enforces that quota.

It contains the following policies:

1. An OAuth 2.0 policy to validate the access token for the request URL, and to look
up attributes from the API Product associated with the application.
2. A policy to enforce a quota on the number of API calls based on the values set
in the API Product.

# Note

As, this flow involves Generation of AccessToken before requesting the protected resource,
the "invoke.sh" will guide you through the Generation of AccessToken flow, 
before proceeding with the Verification


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

Copyright 2013 Apigee Corporation

Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy
of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
