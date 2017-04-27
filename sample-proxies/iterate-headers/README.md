# Iterate through response headers in JavaScript

This API proxy sample demonstrates how to iterate through the list of response headers returned from an `httpClient.get()` method call. The [httpClient object](http://docs.apigee.com/api-services/reference/javascript-object-model#makingjavascriptcalloutswithhttpclient) is part of the Apigee Edge JavaScript Object model. This  object lets you make HTTP requests to backend targets from within a [JavaScript policy](http://docs.apigee.com/api-services/reference/javascript-policy). 

The JavaScript code iterates through the response headers and concatenates them into a string, with a little extra formatting for clarity. 

## JavaScript code
Following is the code used in the JavaScript policy:

```
var response = httpClient.get("http://mocktarget.apigee.net/json");
// set the pending request into a context variable
context.setVariable('pendingResponse', response); 

var headers = "";

var response = context.getVariable('pendingResponse');
if (response) { // retrieve the pending request from the context variable 
    response.waitForComplete();
    if (response.isSuccess()) {
        for (var n in response.getResponse().headers) { 
            headers = headers + n + " --> " + response.getResponse().headers[n] + "\n";
        }
    }
    context.setVariable("response_headers", headers);
}
```

## Example

**API request:**

`curl http://chrislogan-test.apigee.net/iterate-headers`


**API response:**

```
Access-Control-Allow-Origin --> *
Connection --> keep-alive
Content-Length --> 68
Content-Type --> application/json; charset=utf-8
Date --> Thu, 27 Apr 2017 19:16:42 GMT
ETag --> W/"44-rA5eRt/mMLik54NvbWbSzg"
X-Powered-By --> Apigee
```

## Configure 

Update `/setup/setenv.sh` with your Apigee account and Edge organization details. For more information, see ["Apigee Edge sample API proxies"](https://github.com/apigee/api-platform-samples).

## Deploy and test the API proxy

To deploy, run `$ sh deploy.sh`

To test, run `$ sh invoke.sh`

## Doc references

* [JavaScript policy](http://docs.apigee.com/api-services/reference/javascript-policy)
* [httpClient function](http://docs.apigee.com/api-services/reference/javascript-object-model#makingjavascriptcalloutswithhttpclient)
* [Related community post](https://community.apigee.com/questions/40579/how-to-access-httpclient-response-headers-in-javas.html)

## Ask the community

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
