OAuth 2.0 Sample API Proxy and Login App

The directory /apiproxy contains a sample API proxy for the following OAuth 2.0 flows:

* Web-Server flow
* Implicit flow
* Client credentials

This API proxy provides a sample login app to demonstrate the interaction between the Apigee API Platform OAuth
infrastructure and a third-party login app. 

# Web-Server flow:

1. http://{org_name}-{env_name}.apigee.net/oauth/authorize?response_type=code&client_id=EOGjx792Vq6lK8D9ATr7Vf5cZ1UHbc9k

2. Redirect URI should be: http://{org_name}-{env_name}.apigee.net/oauth/samplelogingpage?client_id={request.queryparam.client_id}&response_type={request.queryparam.response_type}&scope={request.queryparam.scope}

3. On successful authentication, login application invokes: 

http://{org_name}-{env_name}.apigee.net/oauth/authorizationcode?client_id=EOGjx792Vq6lK8D9ATr7Vf5cZ1UHbc9k&response_type=code&userId=Sandeep

This is something that the login page should do (as the sample login page above does).

4. Exchange token for authorization code

URI: POST http://{org_name}-{env_name}.apigee.net/oauth/token

HTTP headers:

* Authorization (Basic HTTP Authentication of client_id and secret)
* Content-Type : application/x-www-form-urlencoded

Query parameters: code={auth_code}&grant_type=authorization_code&response_type=code
                    
# Implicit flow:

1.    http://{org_name}-{env_name}.apigee.net/oauth/authorize?response_type=token&client_id=EOGjx792Vq6lK8D9ATr7Vf5cZ1UHbc9k
2.    Redirect URI should look like - http://sandeep-prod.apigee.net/oauth/samplelogingpage?client_id={request.queryparam.client_id}&amp;response_type={request.queryparam.response_type}&amp;scope={request.queryparam.scope}
3.    On successful authentication, login application has to invoke http://sandeep-prod.apigee.net/oauth/token?response_type=token&client_id=EOGjx792Vq6lK8D9ATr7Vf5cZ1UHbc9k&userId=Sandeep

# Client credentials flow:

URL: POST http://sandeep-prod.apigee.net/oauth/token
HTTP headers: Authorization (Basic HTTP Authentication using client_id and secret)
Query parameter:     grant_type=client_credentials

Changes to be made in production: (for Web-Server flow & Implicit flow) 

1. Launch your own login page that will listen to something like https://<yourdomin>/<loginpageURL>
2. The login page should implement the API call mentioned in step 3
3. Modify the policy 'RedirectToLoginApp' to point to your login page instead of the sampleloginpage
https://<yourdomin>/<loginpageURL>?client_id={request.queryparam.client_id}&amp;response_type={request.queryparam.response_type}&amp;scope={request.queryparam.scope}

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