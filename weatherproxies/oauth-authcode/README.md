# Three-Legged OAuth

This sample shows how use the OAuth 2.0 "authorization code" grant type, which redirects
the end user to a login page, then once the user is authenticated, it returns
an access token. 
It also validates incoming requests using the
access token, and uses an API Product to assign a quota value to each application, and
enforces that quota.

It contains the following policies:

1. An AssignMessage policy to set the "flow.resource.name" variable, which is essential
to API Product processing.
2. An OAuth 2.0 policy to generate the authorization code that is required in order to 
authenticate a user.
3. An OAuth 2.0 policy to generate the access token on a specific URL.
4. An OAuth 2.0 policy to validate the access token for another URL, and to look
up attributes from the API Product associated with the application.
5. A policy to enforce a quota on the number of API calls based on the values set
in the API Product.

To deploy this sample, use the instructions in README.md in the "setup" directory.
