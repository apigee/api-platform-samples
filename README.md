# Apigee API Platform Samples

This is a collection of sample proxies for the [Apigee API Platform](http://apigee.com/about/enterprise), designed to help developers 
learn how to use the platform, and deployment tools to aid in development of proxy bundles.

The Apigee API Platform provides developers with:

* A RESTful API to enable DIY control and oversight of APIs, apps, and developers 

* API Key and OAuth 1 and 2 support

* Out-of-the-box policies for functionality that you would rather not code yourself (like quotas, transformations, response caching, etc.)

* APIs and scripting support for functionality that you would rather innovate and code yourself

* The ability to share your work with other developers, and to reuse it across your own projects, by exposing it as APIs that you own and control

* Scalable, managed test and prod environments with operational analytics

# Getting started

You require an Apigee API Platform account. [Sign up for a free trial account.](http://enterprise.apigee.com/signup)

You also require [Python](http://python.org/getit/), to use the deployment tool.

# Deploy

You can deploy all of the samples to your organization at once using a simple setup script provided in this distribution.

1. Update the file `/setup/setenv.sh` with settings for your API Platform account.

2. Run `deploy_all.sh`

    **Note**: This step deploys all API products, developers, and apps needed for samples that use OAuth.

Each sample API proxy directory contains a script, `invoke.sh`, that issues a sample HTTP request to the API.

If you make changes to the sample API proxy, simply run the proxy's `deploy.sh` script to redeploy it.

# What's here:

## `/sample-proxies`

A set of fully-functional API proxies that you can deploy and invoke on the Apigee API Platform.

Feel free to modify and build upon them, and redeploy the proxies for changes to take effect. See the proxy's README for instructions on how to deploy and use it.

For a detailed overview of the available sample see the [API Platform Samples documentation](http://apigee.com/docs/enterprise/content/api-platform-samples).

## `/schemas`

XML schemas that you can  use as a reference when working with policies, API proxy configuration,
API products, apps, and developers.

## `/simpleProxy`

A basic API proxy that is used in the [API Platform Developer Guide](http://apigee.com/docs)

## `/setup`

Simple scripts to help you deploy the sample API proxies and profiles that they 
rely on, including API products, developers, and apps.

Set you Apigee API Platform account settings in `setenv.sh` ([Register for a free Apigee API Platform account](http://eneterprise.apigee.com/signup))

To deploy a single sample, run `deploy.sh proxyName`, where `proxyName` is the name of the directory under `/sample-proxies` that contains the proxy you want to deploy.

To deploy all samples and API products, run `deploy_all.sh`

## `/tools`

* `deploy.py`: Uploads an API proxy to an organization on the Apigee platform and then deploys it to the environment specified.

* `proxy_gen.sh`: A simple script that interacts with the API Platform to locally generate an API proxy scaffold.

# Get help and interact with other API developers

For assistance, post to the [The Apigee Developer Forum](http://support.apigee.com)

Copyright © 2013 Apigee Corporation

Licensed under the Apache License, Version 2.0 (the "License"); you may 
not use this file except in compliance with the License. You may obtain 
a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
