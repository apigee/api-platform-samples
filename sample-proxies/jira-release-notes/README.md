# Jira release notes generator 

This sample leverages a [Jira API](https://docs.atlassian.com/jira/REST/6.2.7/) to return issues that are tagged in Jira with a 'release_notes' label. The proxy converts Jira's JSON response to XML, then applies an XSL stylesheet that generates a base set of HTML-formatted release notes. The stylesheet gets text from a 'Release Notes Summary' field.

If your Jira environment uses different fields, modify the URI query parameters accordingly (in invoke.sh as well, if you want to use that script), and modify the .xsl resource file accordingly.

**Hint**: The XSL stylesheet relies on a specific XML hierarchy for grabbing content. To see what the correct XML hierarchy is for your Jira environment, temporarily detach the XSL policy from the API proxy flow to get back pure XML.

# Policies and resources used

* JSON to XML policy
* XSL Transform policy
* XSL stylesheet

# Set up

* The username and password that you use to login to enterprise.apigee.com.
* The name of the organization in which you have an account. Login to 
  enterprise.apigee.com and check account settings.
* When you invoke the proxy, you'll also need your Jira username and password.  

# Configure 

Update `/setup/setenv.sh` with your environment details

# Import and deploy sample project

To deploy, run `$ sh deploy.sh`

To test, run `$ sh invoke.sh`

# Get help

For assistance, please use [Apigee Support](https://community.apigee.com/content/apigee-customer-support).

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
