# Sample Mobile App

This directory contains tools to help you get up-and-running with Apigee Edge.

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

# Prerequisites

<!-- Get versions, links, and stuff -->

* An account on enterprise.apigee.com
* curl
* PhoneGap
* Xcode

# Instructions

1. Create an API backend by running the bootstrap script.

   $ sh bootstrap_app_backend.sh

2. Open your PhoneGap app in Xcode.

3. Replace the default index.html file with the index.html file in this directory.

4. Modify the value of url in the ajax method to point to your API backend 
   created in step 1, above.

5. In XCode, run the app iOS simulator (select the 'Play' button)

By following the

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