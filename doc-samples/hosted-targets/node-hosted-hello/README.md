# How to create a hello world Node.js application with Hosted Targets

This sample is a simple hello world Node.js proxy.

## Test the app locally
  Before pushing to Apigee, it can be useful to test the application locally first to make sure everything is working as it should.

  1. Make sure you have [Nodejs](https://nodejs.org/en/download/) installed

  2. Start the application:

      ```
      PORT=8081 node apiproxy/resources/hosted/index.js
      ```

  3. Test the applicaiton:

      ```
      curl http://localhost:8081
      {"date":"2018-03-12T21:45:22.161Z","msg":"Hello, World!"}
      ```

## Deploy the proxy
  1. Make sure you have [apigeetool](https://github.com/apigee/apigeetool-node) installed
  2. Make sure you have [get_token](https://apidocs.apigee.com/api-reference/content/using-oauth2-security-apigee-edge-management-api) script installed
  3. Deploy your proxy:

      ```
      get_token && apigeetool deployproxy \
      -o <apigee org> \
      -e <apigee env> \
      --json \
      --token "$(< ~/.sso-cli/valid_token.dat)" \
      --api node-hosted-hello \
      --directory .
      ```
      **Note**: This step might take a minute or two to work

  4. Test your proxy deployment:

      ```
      curl https:/<apigee org>-<apigee env>.apigee.net/node-hosted-hello
      ```

  5. Undeploy your proxy:

      ```
      get_token && apigeetool undeploy \
      -o <apigee org> \
      -e <apigee env> \
      --json \
      --token "$(< ~/.sso-cli/valid_token.dat)" \
      --api node-hosted-hello \
      --revision <revision to undeploy e.g 1>
      ```

  For more insight into Hosted Targets and Apigee, visit our [documentation](https://docs.apigee.com/api-platform/hosted-targets/hosted-targets-overview.html).

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

