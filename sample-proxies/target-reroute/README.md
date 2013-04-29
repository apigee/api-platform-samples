# Python Script Sample

This sample demonstrates a simple scenario of changing the target endpoint
with the help of setting the flow variable "target.url" in a Javascript Step Policy,
with removal of the proxy.pathsuffix. The proxy uses the Yahoo Weather API for actual
target endpoint This reference helps in understanding the process of building,
deploying, activating and accessing this sample.

# Set up

* The username and password that you use to login to enterprise.apigee.com.
* The name of the organization in which you have an account. Login to 
  enterprise.apigee.com and check account settings.

# Configure 

Update `/setup/setenv.sh` with your environment details

# Import and deploy sample project

To deploy, run `/setup/deploy.sh`

To test, run `invoke.sh`

# Get help

For assistance, post to the [Apigee Developer Forum](http://support.apigee.com)

Copyright © 2013 Apigee Corporation

Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy
of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
