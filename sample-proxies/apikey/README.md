# API Key Validation

This sample shows how to perform a simple "API key" style of API security using Apigee. It uses
three policies:

1. An AssignMessage policy to set the "flow.resource.name" variable, which is essential
to API Product processing.
2. A policy to validate the API key, return an error if it is invalid, and, for valid keys, look up
attributes from the relevant API Product.
3. A policy to enforce a quota on the number of API calls based on the values set
in the API Product.

# Set up

* The username and password that you use to login to enterprise.apigee.com.
* The name of the organization in which you have an account. Login to 
  enterprise.apigee.com and check account settings.

# Configure 

Update /setup/setenv.sh with your environment details

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
