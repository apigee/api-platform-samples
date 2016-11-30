# Dynamic Endpoint URI 

### Sample use case

Demonstrate the ability to change the target endpoint of an API proxy dynamically at runtime. 

### About

In this sample, the request is either routed to Facebook or Twitter based on the value passed to the "routeTo" query parameter. For example, the following cURL command directs the request to Twitter: 

`curl "http://$org-$env.$api_domain/dynamic-endpoint?routeTo=tw"`

This approach could also be used to dynamically route requests between different backend environments, such as testing and production environments, sandbox and production APIs, and so on.

This example uses a **route rule** in the ProxyEndpoint definition:

```
<ProxyEndpoint name="default">
	<HTTPProxyConnection>
		<BasePath>/dynamic-endpoint</BasePath>
		<VirtualHost>default</VirtualHost>
	</HTTPProxyConnection>
	<RouteRule name="fbroute">
		<Condition>request.queryparam.routeTo = "fb"</Condition>
		<TargetEndpoint>facebook</TargetEndpoint>
	</RouteRule>
	<RouteRule name="twroute">
		<Condition>request.queryparam.routeTo = "tw"</Condition>
		<TargetEndpoint>twitter</TargetEndpoint>
	</RouteRule>
	<RouteRule name="default">
		<TargetEndpoint>twitter</TargetEndpoint>
	</RouteRule>	
</ProxyEndpoint>
```

In the route rule, the target endpoint of the request is determined by the value of the "routeTo" query parameter. If the "routeTo" query parameter is omitted, the default action is to pass the request to Twitter.

See the target endpoint definitionsin the `target` directory of the proxy to see how these endpoints are defined.  


### Set up, deploy, invoke

See the main project [README](../../README.md) file for information about setting up, deploying, and invoking sample proxies. 

To deploy, run `$ sh deploy.sh`

To test, run `$ sh invoke.sh`

The invoke.sh script first invokes the proxy with `routeTo=fb` and then with it set to `routeTo=tw`. 


### More information

For more on route rules, see:

* [Understanding routes](http://docs.apigee.com/api-services/content/understanding-routes)


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
