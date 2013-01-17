# Conditional Policy Enforcement

This sample demonstrates conditional policy enforcement on 
the Apigee API Platform.  Conditional policy enforcement enables 
you to execute a policy based on a condition defined on a flow.

The condition in this sample evaluates a custom HTTP header called 
“responsetime”. When “true”, a Python script is executed, which 
populates custom response headers with metrics from the Apigee gateway. 


For a complete list of redefined variables that you can use to build
 conditional logic, please see:

http://apigee.com/docs/api/predefined-variables

For instructions on constructing conditional statement with those variables, please see:

http://apigee.com/docs/api/conditional-operators

# Set up

* The username and password that you use to login to enterprise.apigee.com.
* The name of the organization in which you have an account. Login to 
  enterprise.apigee.com and check account settings.

You can obtain a free account at http://enterprise.apigee.com/signup

# Configure 

Update /setup/setenv.sh with your environment details

# Import and deploy sample project

Run:

/setup/deploy.sh

# Testing

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
