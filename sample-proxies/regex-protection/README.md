# Regular expression protection


The regular expression threat protection policy can protect your backend APIs and microservices from SQL injection attacks. 

### About the proxy

The proxy uses the [Regular Expression Protection policy](http://docs.apigee.com/api-services/reference/regular-expression-protection) to check for possible SQL injection attacks. 

### Policies used in the proxy

This sample uses an Regular Expression Protection to check for possible SQL injection in a query parameter. However, note that the policy lets you check all types of input parameters and body content.

We detect certain SQL injection pattern words such as delete, exec, insert, and so on. We check query parameters. Here's the Regex we use to detect SQL injection attacks in the policy:

`<Pattern>[\s]*(?i)((delete)|(exec)|(drop\s*table)|(insert)|(shutdown)|(update)|(\bor\b))</Pattern>`

In addition, we use a FaultRule flow to check for cases where a the policy detects a threat, and return a custom error message back to the client. By default, the Regex Protection policy returns a 500 status, but it's a good practice to return a more generic status and message. We want to prevent any meaningful information from being sent back to potential hackers. To do this, we use the Raise Fault policy to set a `400 Bad Request` status when a threat is detected. 


### Try different query param values

This request returns a successful 200 OK response because `select` is not part of the SQL injection query:

`curl -s http://<org>-<env>.apigee.net/regex-protection?query=select`

This request returns a `400 Bad Request` response because `delete` is a potential threat. 

`curl -s http://<org>-<env>.apigee.net/regex-protection?query=delete`

```
HTTP/1.1 400 Bad request
Date: Wed, 15 Jun 2016 16:34:22 GMT
Content-Type: text/plain
Content-Length: 0
Connection: keep-alive
Server: Apigee Router
```


### Set up, deploy, invoke

1. Edit the `api-platform-samples/setup/setenv.sh` file to reflect your Apigee Edge organization and environment. 
2. Deploy the API proxy. You can use the `deploy.sh` script, or simply import the ZIP file through the Edge UI.
3. Call the API. You can use the `invoke.sh` script, by using cURL directly, or with a REST client like Postman. There's no authentication required -- you can hit this API directly.  


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
