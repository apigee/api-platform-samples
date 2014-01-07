# Variables

This sample demonstrates how you can use the ExtractVariables policy to 
populate variables. The sample ExtractVariables policy sets the variable values
as HTTP headers in the response.

The sample policy demonstrates how to populate variable from the context, 
API proxy configuration, request message, and m by parsing message content.

The sample converts the XML response to from Yahoo! weather to demonstrate 
how to configure the ExtractVariables policy with XPath and JSONPath
to work with message content.

You can also refer to the API Platform variables reference:

http://apigee.com/docs/enterprise/content/predefined-variables

# Configure 

Update `/setup/setenv.sh` with your environment details

# Import and deploy sample project

To deploy, run `$ sh deploy.sh`

To test, run `$ sh invoke.sh`

# Get help

For assistance, post to the [Apigee Developer Forum](http://support.apigee.com)

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
