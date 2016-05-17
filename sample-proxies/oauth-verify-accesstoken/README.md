# Verify an OAuth2 token

This sample API proxy shows how an OAuth 2.0 access token is used to access a resource
protected by OAuth policies. The API Proxy validates incoming requests using the access token, 
and reads Quota settings from an API Product to rate-limit client apps.

The API proxy contains the following policies:

1. OAuth 2.0: Validates the access token for the request URL, and looks up
attributes from the API Product associated with the client app
2. Quota: Enforces a limit on the number of API calls, based on the values set
in the API product

# Note

As, this flow involves generation of access token before requesting the protected resource,
the `invoke.sh` script will guide you through the generation of access token flow.
Simply follow prompts.


# Set up

* The username and password that you use to login to enterprise.apigee.com.
* The name of the organization in which you have an account. Login to 
  enterprise.apigee.com and check account settings.

# Configure 

1. Update `/setup/setenv.sh` with your account settings

2. Configure API products, developers, and apps in your organization by
running the following script:

3. Run `../setup/provisioning/setup.sh`

# Import and deploy sample project

To deploy, run `$ sh deploy.sh`

To test, run `$ sh invoke.sh`

# Get help

For assistance, please use [Apigee Support](https://community.apigee.com/content/apigee-customer-support).

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
