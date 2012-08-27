# Two-Legged OAuth

This sample shows how use the OAuth 2.0 "client credentials" grant type to return an OAuth
access token for an application based on the application's own credentials. (This is 
sometimes called "two-legged OAuth.") It also validates incoming requests using the
OAuth token, and uses an API Product to assign a quota value to each application, and
enforces that quota.

It contains the following policies:

1. An AssignMessage policy to set the "flow.resource.name" variable, which is essential
to API Product processing.
2. An OAuth 2.0 policy to generate the access token on a specific URL.
3. An OAuth 2.0 policy to validate the access token for another URL, and to look
up attributes from the API Product associated with the application.
4. A policy to enforce a quota on the number of API calls based on the values set
in the API Product.

To deploy this sample, use the instructions in README.md in the "setup" directory.
