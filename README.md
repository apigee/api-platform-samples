2/25/2013

# Apigee API Platform Samples

Apigee API Platform Samples are designed to help developers 
learn how to use the Apigee API Platform.

Apigee's API Platform provides developers with:

* A RESTful API to enable DIY control and oversight of APIs, 
  apps, and developers 
* API Key and OAuth 1 and 2 support
* Out-of-the-box policies for functionality that you would rather
  not code yourself (like quotas, transformations, response
  caching, etc.)
* APIs and scripting support for functionality that you would 
  rather innovate and code yourself
* The ability to share your work with other developers, and to 
  reuse it across your own projects, by exposing it as
  APIs that you own and control
* Scalable, managed test and prod environments with operational 
  analytics

Fully-featured, free accounts are available at:

<http://enterprise.apigee.com/signup>

Learn more at <http://apigee.com/docs>

# Getting started

All of these samples require you to have an account on:
<http://enterprise.apigee.com>

You can sign up for a trial account at:
<http://enterprise.apigee.com/signup>

Learn more at <http://apigee.com/docs>

You also require:

Python, to use the deployment tool.

Deploy all sample proxies at once:

$ cd /setup

Set your Apigee API Platform account settings in setenv.sh.

Run:

$ sh deploy_all.sh

Note this step also deploys all API products, developers, and apps needed for OAuth.)

Navigate to /sample-proxies.

Each sample API proxy directory contains a script called
invoke.sh that issues a curl command to the API exposed 
by the sample API proxy.

$ sh invoke.sh

If you make changes to the sample API proxy, simply run:

$ sh deploy.sh

in the sample AIP proxy's directory to import the proxy and
deploy changes.

# What's here:

/sample-proxies

A set of fully-functional API proxies that you can deploy and invoke
on the Apigee API Platform. Feel free to modify them as needed.
(Be sure to deploy changes for them to take effect.)

/schemas

XML schemas that you can  use as a reference when working with policies, API proxy configuration,
API products, apps, and developers.

/simpleProxy

A basic API proxy that is used in the API Platform Developer Guide at:
http://apigee.com/docs

/setup

Simple scripts to help you deploy the sample API proxies and profiles that they 
rely on, including API products, developers, and apps.

Set you Apigee API Platform account settings in 

setenv.sh

(You can obtain a free account at http://eneterprise.apigee.com/signup)

To deploy a single sample, run 

$ sh deploy.sh

And provide the name of the directory under /saple-proxies that
contains the proxy you want to deploy.

To deploy all samples and API products, run:

$ deploy_all.sh

/tools

Contains a Python deployment tool (deploy.py) that imports an API proxy to an
organization on the Apigee platform and then deploys it to the environment
specified.

# Get help and interact with other API developers

<http://support.apigee.com>

Copyright 2013 Apigee Corporation

Licensed under the Apache License, Version 2.0 (the "License"); you may 
not use this file except in compliance with the License. You may obtain 
a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.


