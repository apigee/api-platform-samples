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
## You can obtain a free account at https://accounts.apigee.com/accounts/sign_up
## --------------------------------------

org="Enter the name of your organization here"
username="Enter your Apigee username"

# While testing, it's not necessary to change the setting below

env="test"
url="https://api.enterprise.apigee.com"
api_domain="apigee.net"

## Do not change the settings below
## --------------------------------------
export org=$org
export username=$username
export env=$env
export url=$url
export api_domain=$api_domain
