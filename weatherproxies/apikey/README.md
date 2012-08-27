# API Key Validation

This sample shows how to perform a simple "api key" style of API security using Apigee. It uses
three policies:

1. An AssignMessage policy to set the "flow.resource.name" variable, which is essential
to API Product processing.
2. A policy to check the API key itself, return an error if it is invalid, and look up
attributes from the API Product if it is.
3. A policy to enforce a quota on the number of API calls based on the values set
in the API Product.

To deploy this sample, use the instructions in README.md in the "setup" directory.
