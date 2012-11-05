DynamicEndpointURI SAMPLE
--------------------------
DISCLAIMER: 
--------------------------
Apigee API Platform Samples are designed to help you learn how to use
the Apigee API Platform.

Learn more at http://apigee.com/docs

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
--------------------------
Description
--------------------------
This sample demonstrates the ability of Apigee to change the target end point dynamically at run-time. In this sample, 
the request is either routed to facebook or twitter based on routeTo query param.
This reference helps in understanding the process of building, deploying, activating and accessing this sample.

--------------------------
Pre-Conditions
--------------------------
1. Identify server name/IP Address and port of the Apigee Gateway installation.
2. Identify the credentials for the Apigee Gateway installation.
3. Identify the organization, environment and virtual host name and port for your instance.
You can get this information from person who setup the Apigee installation.
4. Ensure you have Firefox with RestClient add-on enabled(https://addons.mozilla.org/en-US/firefox/addon/restclient/)
The instructions in this sample assume you are using Firefox add-on rest client but you may use any other rest client also.

--------------------------
Configure sample project
--------------------------
Update the setenv.sh for you environment details

--------------------------
Import and deploy sample project
--------------------------
Execute "sh deploy.sh"

--------------------------
Testing
--------------------------
1. Open two browser windows and open below url in each
(a) http://<vhost>:<port>/4g-samples-dynamic-endpoint?routeTo=fb
(b) http://<vhost>:<port>/4g-samples-dynamic-endpoint?routeTo=tw


2. Link (a) should show facebook and (b) will be showing the twitter results.

--------------------------
Clean up
--------------------------
Execute "sh cleanup.sh"