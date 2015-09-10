# OAuth documentation examples

This API proxy is included as a companion to the Apigee Edge doc topic: "[Requesting access tokens and authorization codes](http://apigee.com/docs/api-services/content/asking-tokens)".

The proxy includes basic endpoints and policies for:

* generating access tokens
* refreshing access tokens
* generating authorization codes

Recommended use is to deploy this proxy and use it to try out the requests described in the doc topic. 

# Tip: Using Postman to make POST requests

The best way to call the proxy endpoints is to use a REST client like Postman. It's very easy to set up REST calls in Postman given the curl examples shown in the doc. For example, this curl command:

```
curl -i -H 'ContentType: x-www-form-urlencoded' -X POST 'https://docs-test.apigee.net/oauth/accesstoken' -d 'code=I9dMGHAN&grant_type=authorization_code&redirect_uri=http://example-callback.com' -H 'Authorization: Basic c3FIOG9vSGV4VHo4QzAyg5T1JvNnJoZ3ExaVNyQWw6WjRsanRKZG5lQk9qUE1BVQ' 
```

Can be modeled in Postman, where the "-d" body parameters are set to x-www.form-urlencoded parameters in Postman and the content type and auth headers are specified in the Headers fields. For example:

![Alt text](https://github.com/apigee/api-platform-samples/blob/master/doc-samples/images/postman-oauth.png)

# Set up

What you need:

* The username and password that you use to login to enterprise.apigee.com.
* The name of the organization in which you have an account. Login to 
enterprise.apigee.com and check account settings.

# Configure 

Update `/setup/setenv.sh` with your environment details

# Import and deploy sample project

To deploy, run `$ sh deploy.sh`

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
