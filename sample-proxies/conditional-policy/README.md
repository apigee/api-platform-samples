# Conditional Policy Enforcement

This sample demonstrates conditional policy enforcement on 
the Apigee API Platform.  Conditional policy enforcement enables 
you to execute a policy based on a condition defined on a flow.

The condition in this sample evaluates a custom HTTP header called 
“responsetime”. When “true”, a Python script is executed, which 
populates custom response headers with metrics from the Apigee gateway. 


For a complete list of predefined variables and instructions on constructing conditional statements with those variables, see these topics in the Apigee docs:

* [Variables reference](http://docs.apigee.com/api-services/reference/variables-reference)

* [Conditions reference](http://docs.apigee.com/api-services/reference/conditions-reference)


# Set up

* The username and password that you use to login to enterprise.apigee.com.
* The name of the organization in which you have an account. Login to 
  enterprise.apigee.com and check account settings.

You can obtain a free account at https://accounts.apigee.com/accounts/sign_up

# Configure 

Update `/setup/setenv.sh` with your environment details

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
