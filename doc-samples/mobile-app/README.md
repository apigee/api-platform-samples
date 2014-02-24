# Sample Mobile App

The sample is intended to show how an app developer can leverage Apigee Edge.

Its goal is mainly to show you how the pieces fit together, not to 
demonstrate all of the bells and whistles that Apigee Edge provides. 

The pieces of the demo are:

* An API backend (running on Apigee APIBaaS)
* An API facade (running on Apigee API Services)
* A mobile app that you run in XCode, that calls the API 
facade and consumes data that you store in the API backend.

This sample provides:

* Scripts that set up an API backend in your account on UserGrid
* A JQuery Mobile app, based on PhoneGap, that calls the API backend
* Scripts that set up an API proxy the runs as a facade for your API backend

NOTE: This is an extremely simplified sample that is not intended to 
demonstrate any capabilities of APIBaaS except data storage. This
sample does not demonstrate the usage of APIBaaS SDKs either. Instead,
it uses raw JavaScript to make API calls.

You can find the APIBaaS SDKs here:

http://apigee.com/docs/app-services/content/app-services-sdks-0

WARNING: For simplicity, this demo disables security. Do not use this demo
in a production Apigee Edge environment. (We will show you how to enable
security in another sample.)

# Prerequisites

<!-- Get versions, links, and stuff -->

* An account on enterprise.apigee.com
* wget
* curl
* npm (Node Packaged Modules)
* PhoneGap
* Xcode

# Instructions

1. Create an API backend by running the bootstrap script:

   $ sh bootstrap_api_backend.sh

2. Create a PhoneGap to call your API backend:

   $ sh create_phonegap_app

4. In /www/index.html, modify the value of url in the ajax method to 
   point to your API backend created in step 1, above.

  You can do this in XCode or in the source file in /www. If you modify
  /www/index.html, make sure you run:
  
  $ phonegap build ios
  
  (The build command copies all files in /www into /platforms/ios/www.)  

5. In XCode, run the app iOS simulator (select the 'Play' button)

# Troubleshooting

We'll put some troubleshooting steps in here.

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