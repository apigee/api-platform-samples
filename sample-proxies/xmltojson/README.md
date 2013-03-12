* XML to JSON Transformation
--------------------------

This sample demonstrates how you can use an XMLtoJSON policy to convert an XML-formatted 
weather report into JSON.

You can also refer to the Developer Guide topic:

http://apigee.com/docs/enterprise/content/customizing-responses-mobile-devices

And the API Platform Policy reference:

http://apigee.com/docs/enterprise/content/policies/convert-json-xml-format

# Configure 

Update /setup/setenv.sh with your environment details

# Import and deploy sample project

Run:

$ sh deploy.sh

Testing

$ sh invoke.sh

If you have Python installed locally, you can run

$ sh invoke_pretty_print.sh

to obtain a pretty-printed JSON response

# Get help

For assistance, post to http://support.apigee.com

Copyright 2013 Apigee Corporation

Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy
of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.