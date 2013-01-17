Python Deploy Tool for the Apigee API Platform

This tool provides a simple command for importing and deploying an API proxy
from your local machine to an environment on the Apigee API Platform.

Copyright 2013 Apigee Corporation

Licensed under the Apache License, Version 2.0 (the "License"); you may 
not use this file except in compliance with the License. You may obtain 
a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

-------------

You require an account in an organization at enterprise.apigee.com.
To obtain a free account, visit, enterprise.apigee.com/signup.

Usage

$ deploy.py -n {apiName} -u {myname:mypass} -h https://api.enterprise.apigee.com -o {myorg} \
-e {environment} -p {basePath} -d {location of ./apiproxy directory}

-n The name of the API that will be created when this APi proxy is uploaded to Apigee. 
The name will be the display name in the Apigee API Platform UI. If the API already exists,
then the deploy tool will import this as a new revision of the existing API.

-u Your username and password for your account on enterprise.apigee.com.

-h The base URL for the Apigee API (do not modify for cloud/trial accounts)

-o The Apigee organization to which you belong. To obtain this information, login
to enterprise.apigee.com  and view your account settings.

-e The environment in your organization where you would like this API Proxy to be 
deployed. Note that this script will automatically import and deploy the API proxy 
so that it is immediately available. 
Trial/cloud accounts be default have two environments: 'test' and 'prod'.
Usually, you will set this to be the 'test' environment.

To get a list of available environments:

$ curl -u myname:mypass https://api.enterprise.apigee.com/v1/o/{myorg}/environments/

-p The path used as a pattern match to route incoming message to this proxy. 

-d The path to the local directory where you API proxy files reside. Note that your 
API proxy files must be stored under a directory called /apiproxy. This script will 
ZIP your API proxy into a bundle, and import the bundle to Apigee API Platform 
environment for your organization.

----------------

Visit the Apigee Developer Forum at support.apigee.com.