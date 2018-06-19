
## About the policy schemas

* Use the [policy reference docs](http://apigee.com/docs/api-services/reference/reference-overview-policy) as the primary source of information on using policies correctly.

* If you do try to use the schemas to build or validate policies, assume no element ordering in most cases even when the schema says ordering is required.

* On the [Update an API Proxy Revision management API call](http://docs.apigee.com/management/apis/post/organizations/%7Borg_name%7D/apis/%7Bapi_name%7D/revisions/%7Brevision_number%7D-0), be sure to set the `validate=true` query parameter. If the bundle isn't valid, you should get a list of errors back without a failed deployment.


## Ask the community

[![alt text](../images/apigee-community.png "Apigee Community is a great place to ask questions and find answers about developing API proxies. ")](https://community.apigee.com?via=github)

---

Copyright © 2018 Google Inc.

Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy
of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
