DynamicEndpointURI SAMPLE
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
# Description
This sample demonstrates the ability of Apigee to change the target endpoint 
dynamically at run-time. In this sample,  the request is either routed to Facebook or Twitter 
based on routeTo query param.

--------------------------
Pre-Conditions
--------------------------
* The username and password that you use to login to enterprise.apigee.com.
* The name of the organization in which you have an account. Login to 
  enterprise.apigee.com and check account settings.

You can obtain a free account at http://enterprise.apigee.com/signup

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