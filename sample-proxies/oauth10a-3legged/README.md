# Three-Legged OAuth1.0a

This sample shows how use the OAuth 1.0a - 3 legged flow

It contains the following policies:

1. An OAuth 1.0 GenerateRequestToken Policy to generate the request token, called the RequestToken Endpoint.
   This request token is required to generate verifier and the access token.
2. An GenerateVerifier Policy (A ServiceCallout Policy) to create the externally passed verifier code, 
   associating it to the request token generated in the above step.
3. An OAuth 1.0 GenerateAccessToken Policy to generate an access token using the request token and its verifier, called  the AccessToken Endpoint.
4. An OAuth 1.0 VerifyAccessToken Policy, to validate the OAuth 1.0 AccessToken and its signature, 
   before requesting for the protected resource.

# Set up

* The username and password that you use to login to enterprise.apigee.com.
* The name of the organization in which you have an account. Login to 
  enterprise.apigee.com and check account settings.

# Configure 

1. Update `/setup/setenv.sh` with your environment details

2. Configure API products, developers, and apps in your organization

3. Run `/setup/provisioning/setup.sh`

# Import and deploy sample project

To deploy, run `$ sh deploy.sh`

To test, run `$ sh invoke.sh`

# Get help

For assistance, please use [Apigee Support](https://community.apigee.com/content/apigee-customer-support).

Copyright © 2014, 2015 Apigee Corporation

Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy
of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
