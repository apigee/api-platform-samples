Sample Mobile App

This directory contains tools to help you get up-and-running with Apigee Edge.

The sample is intended to show how an app developer can leverage Apigee Edge.

The benefit of Apigee Edge is that it enables you to create mobile apps and
APIs that support the user experience you want to deliver through your app.

Edge enables you to do this without writing any code except the code in your 
mobile app.

This sample provides:

* Scripts that set up an API backend in your account on UserGrid
* A JQuery Mobile app, based on PhoneGap, that calls the API backend.
* Scripts that set up an API proxy the runs as a facade for your API backend

Prerequisites

<!-- Get versions, links, and stuff -->

* An account on enterprise.apigee.com
* curl
* PhoneGap
* Xcode

Instructions

1. Create an API backend by running the bootstrap script.

   $ sh bootstrap_app_backend.sh

2. Open your PhoneGap app in Xcode.

3. Replace the default index.html file with the index.html file in this directory.

4. Modify the value of url in the ajax method to point to your API backend 
   created in step 1, above.

5. In XCode, run the app iOS simulator (select the 'Play' button)

By following the

Troubleshooting

We'll put some troubleshooting steps in here.