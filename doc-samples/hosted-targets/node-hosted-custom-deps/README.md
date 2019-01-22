# How to create a Node.js application with Hosted Functions using custom modules

This sample is a Node.js proxy that uses [express](https://www.npmjs.com/package/express) and a custom module.

## Deploy the proxy
  1. Make sure you have [apigeetool](https://github.com/apigee/apigeetool-node) installed
  2. Make sure you have [get_token](https://apidocs.apigee.com/api-reference/content/using-oauth2-security-apigee-edge-management-api) script installed
  3. Deploy your proxy:

      ```
      get_token && apigeetool deployhostedtarget \
      -o <apigee org> \
      -e <apigee env> \
      -n hosted-hello-conversion \
      -d ./myapp/ \
      -b hosted-hello-conversion \
      --bundled-dependencies \
      --json \
      --token "$(< ~/.sso-cli/valid_token.dat)"
      ```
      **Note**: This step might take a minute or two to work

  4. Test your proxy deployment:

      ```
      curl https:/<apigee org>-<apigee env>.apigee.net/hosted-hello-conversion/hello/spanish
      {"hello":"This is how you say hello in spanish: Hola!"}
      ```

  5. Undeploy your proxy:

      ```
      get_token && apigeetool undeploy \
      -o <apigee org> \
      -e <apigee env> \
      --json \
      --token "$(< ~/.sso-cli/valid_token.dat)" \
      --api hosted-hello-conversion \
      --revision <revision to undeploy e.g 1>
      ```

  For more insight into Hosted Functions and Apigee, visit our [documentation](https://docs.apigee.com/api-platform/hosted-functions/hosted-functions-overview.html).

# Ask the community

[![alt text](../../../images/apigee-community.png "Apigee Community is a great place to ask questions and find answers about developing API proxies. ")](https://community.apigee.com?via=github)

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

http://docs.apigee.com/api-services/reference/supported-software
