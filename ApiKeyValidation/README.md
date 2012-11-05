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
--------------------------
1. Identify server name/IP Address and port of the Apigee Gateway installation.
2. Identify the credentials for the Apigee Gateway installation.
3. Identify the organization, environment and virtual host name and port for your instance.
You can get this information from person who setup the Apigee installation.
4. Ensure you have Firefox with RestClient add-on enabled (https://addons.mozilla.org/en-US/firefox/addon/restclient/)
The instructions in this sample assume you are using Firefox add-on rest client but you may use any other rest client also.

--------------------------
Configure sample project
--------------------------
Execute "sh deploy.sh"

Make a note of Consumer Key for the Develop App

--------------------------
Testing
--------------------------
1. Using the REST Client, open the following request,

URL: http://<vhost>:<port>/4g-samples-apikey/
Method: GET
Request Header: apikey=<ConsumerKey from create app response>

If the apikey is valid, you should see valid twitter page, 200 response 
If the apikey in not valid, server will return the following response,
<?xml version='1.0' encoding='UTF-8'?><fault><faultstring>ClientId is Invalid</faultstring>
<detail><errorcode>keymanagement.service.invalid_client-invalid_client_id</errorcode></detail></fault>

--------------------------
Clean up
--------------------------
Execute "sh cleanup.sh"