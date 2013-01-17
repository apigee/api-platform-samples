#!/bin/bash

## Update below section for your environment
## Org is the name of the organization in which you have an account. 
## Login to enterprise.apigee.com and check account settings.
## Credentials are the username and password that you use to login 
## to enterprise.apigee.com
## Trial and cloud accounts have environments called 'test' and 'prod'. 
## On-premise deployments may have other environments.
## If you have a trial or cloud account, you do not need to
## modify the URL.
## You can obtain a free account at http://enterprise.apigee.com/signup
## --------------------------------------

org="your org name on enterprise.apigee.com"
username="your user name on enterprise.apigee.com"
env="environment on enterprise.apigee.com--either 'test' or 'prod'"
url="https://api.enterprise.apigee.com"
api_domain="apigee.net"

## Do not change the settings below
## --------------------------------------
export org=$org
export username=$username
export env=$env
export url=$url
export api_domain=$api_domain
