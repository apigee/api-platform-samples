# Javascript Composite Service ("Mashup")

This API Proxy sample "mashes up" responses from two APIs:

* The Google Geocoding API
* The Google Elevation API

The sample returns a JSON response that includes the geocoded location for the center
of that postal code, and the elevation at that location.

This sample works exactly like "policy-mashup," except that the mechanism used is
a whole JavaScript application, rather than a composition of a set of policies.

By comparing the two samples, you can get an idea of the tradeoffs between scripting 
behavior and using out-of-the-box policies provided by Apigee.

# Creating an API Console

This sample is an application that exposes an API, and so demonstrates how
the API Platform can used to develop and expose custom APIs that can
be consumed by other developers.

The API Proxy exposes an API that takes two query parameters:

* country: A two-letter country code
* postalcode: A postal code valid in that country

The included WADL file demonstrates the Apigee-specific extensions to the WADL
specification. This WADL file can be used to generate an interactive API 
Console, designed to be sued by other developers learning to invoke 
APIs you expose.

[Create an Apigee Console To-Go and import and the WADL file.](http://apigee.com/togo)

# References

[API Platform JavaScript Object Model](http://apigee.com/docs/enterprise/content/apigee-javascript-object-model)

[API Platform Developer Guide topic](http://apigee.com/docs/enterprise/content/building-composite-service-2-javascript-app)

[How To Setup an Apigee API Console](http://apigee.com/docs/enterprise/content/set-apigee-api-console)

## Example

A sample request to invoke the sample:

    curl "http://{org_name}-test.apigee.net/altitude2?country=us&postalcode=08008"

Sample response:

    {"country":"us","postalcode":"08008",
     "elevation":{"meters":0.5045232,"feet":1.6552599030345978},
     "location":{"latitude":39.75007129999999,"longitude":-74.1357407}}

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

[![alt text](../../images/apigee-community.png "Apigee Community is a great place to ask questions and find answers about developing API proxies. ")](https://community.apigee.com?via=github)

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