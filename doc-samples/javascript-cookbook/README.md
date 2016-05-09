# Implement custom proxy behavior with JavaScript

### Sample use case

Use JavaScript policies to dynamically read and set flow variables and perform custom logic in a proxy. 

### Policies used in this sample

* [XMLtoJSON](http://docs.apigee.com/api-services/reference/xml-json-policy)
* [JavaScript](http://docs.apigee.com/api-services/reference/javascript-policy)

### Read more about this sample

* [JavaScript Proxy Cookbook Topic](http://apigee.com/docs/api-platform/content/use-javascript-customize-api)

### Set up, deploy, invoke

The basic steps are:

1. Edit `../../setup/setenv.sh` with your Edge information.
2. `./deploy.sh`
3. `./invoke.sh`

See the main project [README](../../README.md) file for information about setting up, deploying, and invoking sample proxies. 

### Output 

The API returns a set of X-Apigee-Demo-* custom headers and JSON with city and state information. 

```
< X-Apigee-Demo-Target: default
< X-Apigee-Demo-ApiProxyName: simple-javascript
< X-Apigee-Demo-ProxyName: default
< X-Apigee-Demo-ProxyBasePath: /javascript-cookbook
< X-Apigee-Demo-ProxyPathSuffix: /xml
< X-Apigee-Demo-ProxyUrl: http://rrt330ea.us-ea.4.apigee.com/javascript-cookbook/xml
< Server: Apigee Router
<
* Connection #0 to host artomatic-test.apigee.net left intact
{"city":"San Jose","state":"CA"} 
```

### See also

[Apigee API Platform JavaScript Object Model](https://apigee.com/docs/enterprise/content/apigee-javascript-object-model)

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
