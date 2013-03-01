OAuth 2.0 Sample API Proxy and Login App

The directory /apiproxy contains a sample API proxy for the following OAuth 2.0 flows:

* Web-Server flow
* Implicit flow
* Client credentials

This API proxy provides a sample login app to demonstrate the interaction between 
the Apigee API Platform OAuth infrastructure and a third-party login app. 

# Web-Server flow:

1. Authorization Request:	

	https://$org-$env.$api_domain/oauth/authorize?response_type=code&client_id=$consumerkey&redirect_uri=$callback&scope=READ&state=foobar

2. The API Provider Login Page Redirection URI:

	https://$org-$env.$api_domain/oauth/samplelogingpage?client_id={request.queryparam.client_id}&response_type={request.queryparam.response_type}&scope={request.queryparam.scope}

3. On successful authentication, login application invokes this url and it returns the Authorization Code to the App

	https://$org-$env.$api_domain/oauth/authorizationcode?client_id=$consumerkey&response_type=code&app_enduser={userId} 

   This is the redirection that the API Provider login page should take care of (similar to what the the sample login page above does).

4. Now, The App need to exchange the authorization code for the AccessToken

	URL: POST https://$org-$env.$api_domain/oauth/token
        HTTP Headers: 
                * Authorization (Basic HTTP Authentication of client_id and client_secret)
                * Content-Type : application/x-www-form-urlencoded
        Payload: code=$auth_code&grant_type=authorization_code&response_type=code



# Implicit flow:

1. Authorization Request:

	https://$org-$env.$api_domain/oauth/authorize?response_type=token&client_id=$consumerkey&redirect_uri=$callback&scope=READ&state=foobar

2. The API Provider Login Page Redirection URI:

        https://$org-$env.$api_domain/oauth/samplelogingpage?client_id={request.queryparam.client_id}&response_type={request.queryparam.response_type}&scope={request.queryparam.scope}

3. On successful authentication, login application invokes this url and it returns the AccessToken to the App

        https://$org-$env.$api_domain/oauth/authorizationcode?client_id=$consumerkey&response_type=code&app_enduser={userId}



# Client credentials flow:

	URL: POST https://$org-$env.$api_domain/oauth/token 
        HTTP Headers: 
                * Authorization (Basic HTTP Authentication of client_id and client_secret)
                * Content-Type : application/x-www-form-urlencoded
        Payload: grant_type=client_credentials



# Changes to be made in production: (for Web-Server flow & Implicit flow) 

1. Launch your own login page that will listen to something like https://<yourdomin>/<loginpageURL>

2. The login page should take care of calling the Authorization Endpoint

3. Modify the policy 'RedirectToLoginApp' to point to your login page instead of the sampleloginpage

	https://<yourdomin>/<loginpageURL>?client_id={request.queryparam.client_id}&amp;response_type={request.queryparam.response_type}&amp;scope={request.queryparam.scope}



# Import and deploy sample project

Run:

$ sh deploy.sh

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
