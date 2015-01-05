# Advanced API Services Token Generation

This sample shows how to integrate Advanced API Services (formerly known as App Services) 
security features into the Apigee gateway in order to provide a single unified authentication
and authorization mechanism for applications consuming a combination of back-end services and
data..

This sample exposes a single endpoint, "/v1/datastore/token", which is responsible for all 
token-related services.  The sample currently supports the following:

-- Access token generation using the OAuth resource owner password grant (grant_type=password)
-- Access token generation using the OAuth client credentials grant (grant_type=client_credentials)
-- Access token invalidation

In this proxy, any user credentials provided as part of a token generation request are validated 
against the Advanced API Services "/users" collection.  Users can be easily defined in this 
collection using the Advanced API Services portal.

In general, when a token is generated, the following occurs:

1) The Authorization header is decoded, and the consumer key and secret are extracted.  If no
	Authorization header is found, or if the key and secret are not found, a 401 Unauthorized
	error is returned.
	
2) Various information is extracted from the request and stored in Apigee flow variables.  A
	401 Unauthorized error is returned if the information provided is not consistent with the 
	request type (no user credentials for a password grant, for example).
	
3) The consumer key provided is validated, and the custom attributes are extracted from the
	application definition.  A 401 Unauthorized error is returned if the custom attributes 
	are not present.
	
4) An Advanced API Services token generation request is executed, which validates any user
	credentials provided in the request and returns a new Advanced API Services access token.  
	A 401 Unauthorized error is returned if the request fails.

5) The Advanced API Services token is extracted, and a new Apigee Gateway token is generated.
	The Advanced API Services token is stored as an attribute of the new Gateway token.
	
6) A final response is generated containing the new Gateway access token, the token time-to-live,
	and the refresh token (if present).

# Set up

* Import the proxy into your Apigee system by importing the bundle using the supplied "deploy.sh" 
script.

# Configure 

1. Using the Apigee Enterprise UI, create a new API Product and configure it to allow access to
	all resources in the imported bundle by using the "/" and "/**" resource paths and the name of
	the imported bundle.
	
2. Using the Apigee Enterprise UI, create a new developer.

3. Using the Apigee Enterprise UI, create a new developer application and associate it with the 
	developer created in step 2.  Configure the application to use the API Product you created in
	step 1.  Once this application is saved you can view the consumer key (client ID) and shared 
	secret that were generated for this application.  IMPORTANT: This consumer key and secret is 
	what should be used when tokens are generated, not the Advanced API Services key and secret.
	
4. Configure the application you created in step 3 with the following custom attributes (NOTE: 
	the case of the attribute names is important):

	Attribute name					Meaning	
	----------------------------	-----------------------------------------------
	DATA_STORE_APP_CONSUMER_KEY		The consumer key associated with the Advanced API Services
									app you want to use.
	DATA_STORE_APP_CONSUMER_SECRET	The shared secret associated with the Advanced API Services
									app you want to use.
	DATA_STORE_APP_NAME				The name of the Advanced API Services application you want
									to use
	DATA_STORE_ORG_NAME				The name of the Advanced API Services organization you want
									to use.

All of this information can be obtained by referring to the "Getting Started" tab for your 
selected organization and application in the Advanced API Services portal.

# Using the sample

The "invoke.sh" script provided with this sample includes commands to generate both password grant
and client credentials grant tokens, and also commands to invalidate tokens.

For a sample of how to validate and use tokens generated using this proxy, see the "token-validate"
sample.


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
