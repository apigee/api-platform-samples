# Javascript async callout

### Note about usage

This sample calls the Yahoo weather API. Since this sample was created, this API began requiring an API key. To execute this sample, you'll need to obtain a key and add it to the JavaScript code in the proxy that calls the API. 

### Sample use case

Make async callouts where other policies can still process rather than waiting on a response from the callout.

### About

There are two js files, getWeatherData and assembleResponse.  The getWeatherData script makes the http requests, and then they are later accessed in assembleResponse.  The example js code extracted from these files:

first js:
```
var paloAlto = httpClient.get('http://weather.yahooapis.com/forecastrss?w=2467861');
context.session['paloAlto'] = paloAlto;
```

second js:
```
var exchange = context.session['paloAlto'];
exchange.waitForComplete(1000);
var resp = exchange.getResponse();
```

You can parameterize the session names and wrap stuff into functions to make the response parsing/assembling a bit more re-usable.

A critical part to understand in this example is that the delay between the 1st and 2nd JS (including any policies and the waitForComplete) should be long enough for all responses to come back.

### Set up, deploy, invoke

To deploy, run `$ sh deploy.sh`

To test, run `$ sh invoke.sh`

### Ask the community

[![alt text](../../images/apigee-community.png "Apigee Community is a great place to ask questions and find answers about developing API proxies. ")](https://community.apigee.com?via=github)

---

Copyright © 2015 Apigee Corporation

Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy
of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
