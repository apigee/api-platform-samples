API Key Validation SAMPLE
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
This sample demonstrates scenario where API Key is validated for each request. 
This reference helps in understanding the process of building, deploying, activating and accessing this sample.

--------------------------
Pre-Conditions

* The username and password that you use to login to enterprise.apigee.com.
* The name of the organization in which you have an account. Login to 
  enterprise.apigee.com and check account settings.

You can obtain a free account at http://enterprise.apigee.com/signup

--------------------------
Configure sample project
--------------------------
Execute "sh deploy.sh"

Make a note of Consumer Key for the Develop App

--------------------------
Testing

Run

$ curl http:{myorg}-test.apigee.net/apikey -H apikey=<ConsumerKey from create app response>

If the apikey is valid, you should see valid Twitter page, 200 response 
If the apikey in not valid, server will return the following response,
<?xml version='1.0' encoding='UTF-8'?><fault><faultstring>ClientId is Invalid</faultstring>
<detail><errorcode>keymanagement.service.invalid_client-invalid_client_id</errorcode></detail></fault>

--------------------------
Clean up
--------------------------
Run
$ ./cleanup.sh