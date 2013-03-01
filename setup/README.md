# Apigee Platform API Samples Setup

This directory provides scripts that configure your local 
environment and deploy sample API proxies to your organization
on the Apigee API Platform.

Directions:

1. If you do not have an account yet, register at: 
>http://enterprise.apigee.com/signup

2. In the file setenv.sh, configure values for your
organization, username, environment.

3.	a. To deploy individual samples, run deploy.sh from the ./setup directory.
Follow prompts.

	b. To deploy all samples, run deploy_all.sh from the ./setup directory. 
Follow prompts.

4. Navigate to the sample-proxies directory. Each sample API proxy 
directory contains an invoke.sh file. Run invoke.sh to submit a request
to that sample API proxy.

# Get help

For assistance, post to the Apigee Developer Forum:

http://support.apigee.com

Copyright 2013 Apigee Corporation

Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy
of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
