# API Key Validation

Copyright 2012 Apigee Corporation

Licensed under the Apache License, Version 2.0 (the "License"); you may 
not use this file except in compliance with the License. You may obtain 
a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

-------------------------------

This sample shows how to perform a simple "api key" style of API security using Apigee. It uses
three policies:

1. An AssignMessage policy to set the "flow.resource.name" variable, which is essential
to API Product processing.
2. A policy to check the API key itself, return an error if it is invalid, and look up
attributes from the API Product if it is.
3. A policy to enforce a quota on the number of API calls based on the values set
in the API Product.

To deploy this sample, use the instructions in README.md in the "setup" directory.
