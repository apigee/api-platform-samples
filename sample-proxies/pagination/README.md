# Pagination sample

This sample demonstrates how you can add pagination to the 
response returned by a backend service.

This is beneficial because it means that you don't need to do 
pagination of the results in the app running on a mobile device.

It also means that you don't need to implement pagination in your
backend service.

This sample uses XSLT to transform a cached XML response to return 
a result set based on two parameters presented by the app: 
'limit' and 'offset'.

# Configure 

Update `/setup/setenv.sh` in this distribution with your environment details.

# Import and deploy sample project

To deploy, run `$ sh deploy.sh`

To test, run `$ sh invoke.sh`

# Get help

For assistance, please use [StackOverflow](http://stackoverflow.com/tags/apigee) and add the tag "apigee".

Copyright © 2014 Apigee Corporation

Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy
of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
