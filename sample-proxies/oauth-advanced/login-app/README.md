# About

This Apigee API proxy is a complete login and consent application for OAuth 2.0 authorization code flows.  It is built using Node.js, leveraging `express`, `express-session`, and `apigee-access` modules.

When deployed locally, sessions are stored using local MemoryStore.  When deployed to Apigee Edge, sessions are stored in Apigee's distributed caching system. A custom session store implementation (ApigeeStore) was built to bridge `express-session` and Apigee's distributed caching.

# How-To

Login Page Access (Apigee Edge):

    https://{hostname}/loginapp/login?apikey={api_key}&redirect_uri={redirect_uri}&scope={scope}&app={app_name}&state={state}

Login Page Access (Local):

    http://localhost:3000/login?apikey={api_key}&redirect_uri={redirect_uri}&scope={scope}&app={app_name}&state={state}

scope, app, and state parameters are optional.

# Session Management

As mentioned previously, sessions are maintained either locally or in Apigee's distributed caching depending on where the app is deployed.  Sessions are managed via Cookies, with a `sid` Cookie provided to clients.  Each session expires after 30 minutes by default.  Once a successful login has occured, a user attribute is set in the server side session data.  This attribute is checked when clients access the consent page.  A valid logged-in session can only be used 1 time for consent to an authorization.  The session is destroyed upon a successful consent in which an authorization code is generated for the client application.  These are security measures to ensure authorization codes cannot be generated for anyone but the user who logged in.


# TODO

There are a few items that need to be enhanced:

    1. Move embedded configuration data to a config.js file.
    2. Improve error handling, such that error responses are rendered and displayed properly to the user.


# Branding

The application uses `ejs` with express to render html and javascript templates.  The CSS branding is located in the `./public/stylesheets` directory.

# License

<http://opensource.org/licenses/MIT>

The MIT License (MIT)

For assistance, please use [Apigee Support](https://community.apigee.com/content/apigee-customer-support).

Copyright © 2014, 2015 Apigee Corporation

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
