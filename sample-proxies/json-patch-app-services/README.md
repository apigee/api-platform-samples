# App Services JSON Patch

This sample enables PATCH requests for the [Apigee App Services API](
https://developers.apigee.com/), which does not support PATCH natively, using
a combination of GET and PUT. The PATCH request body contains a [JSON Patch](
http://tools.ietf.org/html/draft-ietf-appsawg-json-patch-10) document that
describes the incremental changes to be made to the resource. The proxy loads
the original JSON data with a GET request, applies the patch, and stores it
with a PUT request containing the patched data.

A demo application that uses the proxy to load, edit, and save
an App Services entity is included.

# Set up

1. Sign up for [Apigee App Services](https://apigee.com/usergrid/),
2. Create a new application, and a collection inside the application.
3. Create a Permission Rule for the Guest role to allow GET and PUT
    requests for the collection you created (path: /<collection-name>/*)
4. Configure and deploy the proxy bundle (see below)

## Demo application

Configure (see below) and run from a (local) web server.
Update the org/app/collection/item fields to reflect your App Services configuration.

# Configure 

1. Update `/setup/setenv.sh` with your environment details
2. Update `invoke.sh` with your App Services details.

## Demo application

Update the `apiBasePath` variable in `demo/index.html` with the
deployed URL of this proxy bundle in your organization and environment.

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
