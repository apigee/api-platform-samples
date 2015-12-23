# OAuth 2.0 Sample API Proxy and Login App

The directory `/apiproxy` contains a sample API proxy for the following OAuth 2.0 grant types:

* Authorization 
* Implicit 
* Client credentials 

# Configure 

This sample requires you to create a set of developers, apps, and API products in your organization. To create these entities, run the scripts under `../setup`. Follow the instructions in `../setup/README`. 

Alternatively, if you run `../setup/deploy_all.sh`, you will be prompted to create the developers, apps, and API products. 

1. Update `/setup/setenv.sh` with your organization name and email address.

2. Run `/setup/provisioning/setup.sh`

# Import and deploy sample project

To deploy, run `$ sh deploy.sh`

To test, run `$ sh invoke.sh`

This API proxy provides a sample login app to demonstrate the interaction between the Apigee API Platform OAuth infrastructure and a third-party login app. 

### Authorization code grant type (web server) flow:

>**Important:** This example is for demonstration only and primarily shows how to call token endpoints for this grant type. It does not represent a best practice with respect to the implementation/integration of a login app into this flow and should not be used as a model for production purposes. For a full, working sample that does represent best practices, see the [./sample-proxies/oauth-advanced](https://github.com/apigee/api-platform-samples/tree/master/sample-proxies/oauth-advanced) sample. 

1. Authorization Request:	
`https://$org-$env.$api_domain/oauth/authorize?response_type=code&client_id=$consumerkey&redirect_uri=$callback&scope=READ&state=foobar`
2. The API Provider Login Page Redirection URI:
`https://$org-$env.$api_domain/oauth/samplelogingpage?client_id={request.queryparam.client_id}&response_type={request.queryparam.response_type}&scope={request.queryparam.scope}`
3. On successful authentication, login application invokes this URL and it returns the authorization code to the app
`https://$org-$env.$api_domain/oauth/authorizationcode?client_id=$consumerkey&response_type=code&app_enduser={userId}`
This is the redirection that the API Provider login page should take care of (similar to what the sample login page above does).
4. Now, The app needs to exchange the authorization code for an access token
Base URL: POST `https://$org-$env.$api_domain/oauth/token`
HTTP Headers:
-`Authorization` (Basic HTTP Authentication of `consumer key` and `consumer secret`)
-`Content-Type: application/x-www-form-urlencoded`

Payload: `code=$auth_code&grant_type=authorization_code&response_type=code`

For example:
`https://$org-$env.$api_domain/oauth/token?code=$auth_code&grant_type=authorization_code&response_type=code
-X POST -H "Content-type:application/x-www-form-urlencoded" "Authorization: key:secret"`

### Implicit flow:

1. Authorization Request:
`https://$org-$env.$api_domain/oauth/authorize?response_type=token&client_id=$consumerkey&redirect_uri=$callback&scope=READ&state=foobar`
2. The API Provider Login Page Redirection URI:
`https://$org-$env.$api_domain/oauth/samplelogingpage?client_id={request.queryparam.client_id}&response_type={request.queryparam.response_type}&scope={request.queryparam.scope}`
3. On successful authentication, login application invokes this url and it returns the AccessToken to the App
`https://$org-$env.$api_domain/oauth/token?client_id=$consumerkey&response_type=code&app_enduser={userId}`

### Client credentials flow:

* **URL**: POST `https://$org-$env.$api_domain/oauth/token`
* **HTTP Headers**:
    * `Authorization` (Basic HTTP Authentication of `client_id` and `client_secret`)
    * `Content-Type: application/x-www-form-urlencoded`
* **Payload**: `grant_type=client_credentials`


# Changes to be made in production: (for Web-Server flow & Implicit flow) 

1. Deploy a login application at `https://<yourdomin>/<loginpageURL>`

2. The login page implements the call to the authorization endpoint

3. Modify the policy `RedirectToLoginApp` to point to your login page instead of the sample login page
`https://<yourdomin>/<loginpageURL>?client_id={request.queryparam.client_id}&amp;response_type={request.queryparam.response_type}&amp;scope={request.queryparam.scope}`

### Import and deploy sample project

To deploy, run `sh deploy.sh`

To test, run `sh invoke.sh`

### Get help

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

