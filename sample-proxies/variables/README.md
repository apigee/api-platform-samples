
# Extract and assign variables

![alt text](../../images/icon_policy_extract-variable.jpg) ![alt text](../../images/icon-assign-message.jpg) ![alt text](../../images/icon-xml-to-json.jpg)

### Sample use case

Extract data into flow variables from the response message. Assign extracted variables to HTTP response headers. 

### Trace

This screen shot from the [Apigee Edge trace tool](http://apigee.com/docs/api-services/content/using-trace-tool-0) shows the placement of the policies used in this sample. 

![alt text](../../images/variables-trace.png)

### About

The target API is a service that returns weather data. We attach policies to the response flow to demonstrate how to extract and assign variables:

1. Extract variables from the XML response sent from the target. We use XPath syntax to identify the data to extract. The extracted data includes weather location, condition, today's forecast, and tomorrow's forecast. 
2. Convert the response payload from XML to JSON.
3. Extract more variables from the converted JSON payload. We use JSONPath syntax to identify the data to extract. The extracted data includes the weather description and humidity. 
4. Assign the extracted variables to HTTP response headers. 

### Set up, deploy, invoke

See the main project [README](../../README.md) file for information about setting up, deploying, and invoking sample proxies. 

### More information

**Policy used in this sample**

* [Extract Variables policy](http://apigee.com/docs/api-services/reference/extract-variables-policy)
* [Assign Message policy](http://apigee.com/docs/api-services/reference/assign-message-policy)
* [XML to JSON policy](http://apigee.com/docs/api-services/reference/xml-json-policy)

**Related policies**

* [JSON to XML policy](http://apigee.com/docs/api-services/reference/json-xml-policy)
* [XSL transform policy](http://apigee.com/docs/api-services/reference/xsl-transform-policy)

**Related topics**

* [Variables reference](http://apigee.com/docs/api-services/reference/variables-reference)
* [Introduction to flow variables](http://apigee.com/docs/api-services/content/introduction-flow-variables)

### Ask the community

[![alt text](../../images/apigee-community.png "Apigee Community is a great place to ask questions and find answers about developing API proxies. ")](https://community.apigee.com?via=github)

---








# Configure 

Update `/setup/setenv.sh` with your environment details

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
