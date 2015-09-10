# Working with schemas

In Apigee Edge, API proxies, policies, and other entities are configured in XML. Use these schemas to help construct your XML configurations, either as reference material or imported into an XML editing environment.

`/configuration` - Contains the schemas for other-than-policy entities in Edge, such as API proxies, proxy endpoints, target endpoints, HTTP target connections, and so on.

`/policy` - Contains the schemas for Edge policies.

Importing `all.xsd` into an XML editing environment lets you construct all entities and policies in a single view; or you can import individual policy schemas to build single policies.

**Note:** Some policies, such as Message Logging and LDAP, have elements in the `/configuration/configuration_schemas.xsd` schema as well. This is a known issue that Apigee will address in the future. In the meantime, consult the [policy reference docs](http://apigee.com/docs/api-services/reference/reference-overview-policy) for guidance.

### Ask the community

[![alt text](../images/apigee-community.png "Apigee Community is a great place to ask questions and find answers about developing API proxies. ")](https://community.apigee.com?via=github)

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
