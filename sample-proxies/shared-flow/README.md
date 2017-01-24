#### Share Flow Sample

This directory contains a sample illustrating a shared flow. Included are:

- apiproxy/verify-apikey-shared. This is a shared flow that simply checks for a valid incoming API key.
- sharedflowbundle/shared-flow-client-proxy. This is a simple API proxy that calls out to the verify-apikey-shared shared flow using a Flow Callout policy.

When invoked, this sample merely takes an API key, passes the key to a shared flow for verification, then (if the key is valid) makes a request to a backend service. A successful request returns a Hello, Guest! response. If the API key is invalid, the sample returns an "Invalid ApiKey" response.

For documentation on share flows, see [Developing reusable shared flows](http://docs.apigee.com/api-services/content/shared-flows).

# Set up

You'll need the username and password for an admin user in an Edge org. You must be an admin user to import or create a shared flow.

# Configure 

Update `/setup/setenv.sh` with your environment details.

# Import and deploy sample project

To import and deploy the shared flow and client API proxy, run `$ sh deploy.sh`. Remember that you must be an admin user for the org in order to create or import a shared flow.

To test, run `$ sh invoke.sh`. This sends a request to the API proxy, which in turn makes a request for API key validation to the shared flow.

# Get help

For assistance, please use [Apigee Support](https://community.apigee.com/content/apigee-customer-support).

Copyright © 2017 Apigee Corporation

Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy
of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
