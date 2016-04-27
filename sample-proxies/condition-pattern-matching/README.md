# Pattern matching in conditional statements


This proxy lets you easily try out and test conditional statements in an API proxy flow.  

### About the proxy

The proxy is very simple. It includes one conditional step in the Proxy Endpoint flow that evaluates a condition. If the condition evaluates to true, the step's policy is executed. The proxy returns a "success" message if the condition is true, or a "failure" message if the condition evaluates to false.

### Policies used in the proxy

This sample just uses an AssignMessage policy to set a variable. It only gets executed if the step condition is true. There's also a JavaScript policy that places either a "success" or "failure" message in the response. 


### Testing conditional statements

In the Edge proxy editor, just make changes to the conditional statement in the Proxy Endpoint Preflow, then call the API to see whether the condition succeeds or fails. 

```
    <PreFlow name="PreFlow">
        <Request>
            <Step>
                <Condition>(proxy.pathsuffix Matches "/cat")</Condition>
                <Name>SomePolicy</Name>
            </Step>
        </Request>
        <Response/>
    </PreFlow>
```

To get started, try out some of the pattern matching examples in the Apigee doc topic [Pattern matching in conditional statements](http://docs.apigee.com/api-services/content/pattern-matching-conditional-statements). 

### Set up, deploy, invoke

1. Edit the `api-platform-samples/setup/setenv.sh` file to reflect your Apigee Edge organization and environment. 
2. Deploy the API proxy. You can use the `deploy.sh` script, or simply import the ZIP file through the Edge UI.
3. Call the API. You can use the `invoke.sh` script, by using cURL directly, or with a REST client like Postman. There's no authentication required -- you can hit this API directly.  

### Example

The condition is set by default to work if the proxy path suffix is `/cat`. Call the API like this (or use the `invoke.sh` script):

`curl -s http://<org>-<env>.apigee.net/matchtest/cat`

The proxy will return this response:

`Condition Succeeded for proxy.pathsuffix: /cat`

Now, in the Edge UI, change the condition to this:

`<Condition>(proxy.pathsuffix JavaRegex "/c*t")</Condition>`

Save the proxy and try calling the API:

`curl -s http://<org>-<env>.apigee.net/matchtest/cat`

This call fails. Do you know why? For the answer, and lots of other patterns to try, see the Apigee doc topic [Pattern matching in conditional statements](http://docs.apigee.com/api-services/content/pattern-matching-conditional-statements).

### Result

Whenever the condition succeeds, you'll get a response like this:

```
  Condition Succeeded for proxy.pathsuffix: /animals/cats/wild/african/spotted
```

If the condition fails, you'll get a response like this:

```
   Condition Failed for proxy.pathsuffix: /animals/cats
```


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
