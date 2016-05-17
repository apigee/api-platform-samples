
# Extract and assign variables

### Sample use case

Extract variables from an XML and JSON response messages. Assign variables to HTTP response headers.

### Policies 

This sample uses these policies: 

* ![alt text](../../images/icon_policy_extract-variable.jpg "Extract Variables policy") Extract Variables: To pull subsets of data from the response body.  
* ![alt text](../../images/icon-xml-to-json.jpg "XML to JSON policy") XML to JSON: To convert the response from XML to JSON.
* ![alt text](../../images/icon-assign-message.jpg "Assign Message policy") Assign Message: To assign extracted data to response headers. 
* ![alt text](../../images/icon-policy-javascript.jpg "JavaScript policy") Reads extracted variables so they are visible in the Trace tool. 


### About

1. Extract variables from the XML response sent from the target. Use XPath syntax to identify the data to extract. 
2. Use JavaScript policy to read the variables. This allows them to show up in the Trace tool. 
2. Convert the response payload from XML to JSON.
3. Extract more variables from the converted JSON payload. Use JSONPath syntax to identify the data to extract. 
4.  Use JavaScript policy to read the variables. This allows them to show up in the Trace tool. 
4. Assign the extracted variables to HTTP response headers. 

### Set up, deploy, invoke

1. Edit this script with your environment details: `api-platform-samples/setup/setenv.sh`

2. `./deploy.sh`

3. `invoke.sh`

    The proxy returns these custom headers to the client:
    ```
    mock.city: San Jose
    mock.state: CA
    mock.firstName: John
    mock.lastName: Doe
    ```

See the main project [README](../../README.md) file for more detailed information about setting up, deploying, and invoking sample proxies. 

### Trace

This screen shot from the [Apigee Edge trace tool](http://apigee.com/docs/api-services/content/using-trace-tool-0) shows the placement of the policies used in this sample. 

![alt text](../../images/variables-trace.png)

### More information

**Related policies**

* [JSON to XML policy](http://apigee.com/docs/api-services/reference/json-xml-policy)
* [XSL transform policy](http://apigee.com/docs/api-services/reference/xsl-transform-policy)

**Related topics**

* [Variables reference](http://apigee.com/docs/api-services/reference/variables-reference)
* [Introduction to flow variables](http://apigee.com/docs/api-services/content/introduction-flow-variables)
* [Video: Using Extract Variables policy](https://www.youtube.com/watch?v=arVPRaL4qQk)
* [Video: Extracting variables from XML and JSON messages](https://www.youtube.com/watch?v=G0XnHRELeBA)

### Ask the community

[![alt text](../../images/apigee-community.png "Apigee Community is a great place to ask questions and find answers about developing API proxies. ")](https://community.apigee.com?via=github)

---


Copyright © 2016 Apigee Corporation

Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy
of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
