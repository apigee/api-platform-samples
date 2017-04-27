# Iterate through httpClient() response headers

This proxy demonstrates how to iterate through the list of response headers returned from an httpClient() call. The httpClient function lets you make HTTP API calls from within a JavaScript policy. 

The JavaScript code iterates through the response headers and concatenates them into a string, with a little extra formatting for clarity. 

## Example

```
**API request:**

curl http://willwitman-test.apigee.net/iterate-headers

**API response:**

Access-Control-Allow-Origin --> *
Connection --> keep-alive
Content-Length --> 68
Content-Type --> application/json; charset=utf-8
Date --> Thu, 27 Apr 2017 19:16:42 GMT
ETag --> W/"44-rA5eRt/mMLik54NvbWbSzg"
X-Powered-By --> Apigee
```


# Configure 

Update `/setup/setenv.sh` with your Apigee account and Edge organization details. For more information, see ["Apigee Edge sample API proxies"](https://github.com/apigee/api-platform-samples).

# Import and deploy sample project

To deploy, run `$ sh deploy.sh`

To test, run `$ sh invoke.sh`

# Ask the community

[![alt text](../../images/apigee-community.png "Apigee Community is a great place to ask questions and find answers about developing API proxies. ")](https://community.apigee.com?via=github)

---

Copyright © 2017 Apigee Corporation

Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy
of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.