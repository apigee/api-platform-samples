# Simple JavaScript Sample

This sample demonstrates how to write, attach, and execute simple JavaScript in
an API proxy flow. 

The sample implements the cookbook topic:

[JavaScript Proxy Cookbook Topic](http://apigee.com/docs/api-platform/content/use-javascript-customize-api)

The JavaScript in this sample gets a variable from the flow and sets the variable 
as HTTP headers on the response message.

It also demonstrates how you can work with message content. A policy is used to 
transform the weather report from XML to JSON. The resultant JSON is then parsed
into a minimized response message that would mobile device-friendly.

# Configuration

Note that JavaScripts are stored under /resources/jsc in the API proxy, and then 
referenced by policies of type Javascript. (Note capitalization of 'Javascript' in 
policy type.)

The JavaScript policies are then attached to ProxyEndpoint Flow to execute the 
JavaScripts in the appropriate sequence.

# References

[Apigee API Platform JavaScript Object Model](https://apigee.com/docs/enterprise/content/apigee-javascript-object-model)



# Set up

What you need:

* The username and password that you use to login to enterprise.apigee.com.
* The name of the organization in which you have an account. Login to 
  enterprise.apigee.com and check account settings.

# Configure 

Update `/setup/setenv.sh` with your environment details

# Import and deploy sample project

To deploy, run `$ sh deploy.sh`

To test, run `$ sh invoke.sh`

# Ask the community

[![alt text](../images/apigee-community.png "Apigee Community is a great place to ask questions and find answers about developing API proxies. ")](https://community.apigee.com?via=github)

---

Copyright © 2015 Apigee Corporation

Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy
of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
