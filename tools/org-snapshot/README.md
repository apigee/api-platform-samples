# Apigee Organization Snapshot Tool

This directory contains the organization snapshot tool. It retrieves settings from an organization.

You require an account in an organization at enterprise.apigee.com. [Register for an account for free.](https://accounts.apigee.com/accounts/sign_up)

## What the Tool Does

The organization snapshot tool retrieves organization settings, including developers, API products, virtual hosts, key/value maps, etc.

It can be used to backup the details of an organization, or to discover the settings in an organization.

It can be used to retrieve the configuration of two organizations. The retrieved directory structures can then be compared using a file and directory diff tool.

Resources to be retrieved are controlled by a configuration file -- additional resources can be retrieved by modifying the apigee-orgdef.cfg file.

## What the Tool Does Not Do

The tool does not update any settings in the organization or modify the organization in any way.

The tool does not capture every possible setting in the organization.

The tool does not download API proxies. Use the management UI or management API to retrieve API proxies.

### Usage

    ./apigee-getorg.sh -e {admin-email} -s {mgmtserver} -o {org-name} -d {bundle-loc}

* The tool is a set of bash scripts.

* All parameters are optional -- you will be prompted while running the tool.

* `-e` The username for your account on enterprise.apigee.com or your on-prem installation. This account must have sufficient privileges to pull the organization settings (the orgadmin role). ([Register for an account for free.](https://accounts.apigee.com/accounts/sign_up))

* `-s` The management server to be used. Defaults to enterprise.apigee.com, but can be set to an on-prem instance.

* `-o` The Apigee organization in which you have an account. To obtain this information, login to enterprise.apigee.com  and view account settings.

* `-d` The path to the local directory where the bundle directory will be created. Defaults to the current directory.

* `-h` Prints help information.

## Get help

For assistance, please use [StackOverflow](http://stackoverflow.com/tags/apigee) and add the tag "apigee".

Copyright © 2014 Apigee Corporation

Licensed under the Apache License, Version 2.0 (the "License"); you may 
not use this file except in compliance with the License. You may obtain 
a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

