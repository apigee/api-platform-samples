# Apigee Platform API Samples Setup

This directory provides scripts that configure your local environment and deploy sample API proxies to your organization on the Apigee API Platform.

# Prerequisites

Make sure you have the following installed and added as environment variables (recognizable when you run, for example, <code>which curl</code>)

* cURL
* Python

## Windows with Cygwin
If you're running Cygwin on Windows, you'll also need the doc2unix utility. You can install this with the Cygwin installer.


# Directions

1. If you do not have an account yet, [register one for free](https://accounts.apigee.com/accounts/sign_up).

2. In the file `setenv.sh`, configure values for your organization, username, environment.

3. Deploy the samples.

    * To deploy individual samples, run `deploy.sh` from the `./setup` directory.
Follow prompts.
	* To deploy all samples, run `deploy_all.sh` from the `./setup` directory. 
Follow prompts.

4. Navigate to the sample-proxies directory. Each sample API proxy directory contains an invoke.sh file. Run invoke.sh to submit a request to that sample API proxy.

## Windows/Cygwin Troubleshooting

If you get an error saying <code>'\r': command not found</code>, you'll need to run the dos2unix utility to convert line breaks in the shell (.sh) files. You may need to install the utility if the <code>which dos2unix</code> can't find it. The Cygwin installer should let you install it.

To run dos2unix:

1. cd to the api-platform-samples directory.

2. Run the following command:
    find . -name *.sh |xargs dos2unix

3. If the command runs successfully, you can re-run ./deploy_all.sh.

# Get help

For assistance, please use the [Apigee Community](http://community.apigee.com/).

Copyright © 2014 Apigee Corporation

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