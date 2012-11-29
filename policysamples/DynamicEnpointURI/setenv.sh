#!/bin/bash

## Update the section below with your environment settings
## Org is the name of the organization in which you have an account. 
## Login to enterprise.apigee.com and check account settings.
## Credentials are the username and password that you use to login 
## to enterprise.apigee.com
## Trial accounts have 'test' and 'prod' environments by default.
## You can obtain a free account at http://enterprise.apigee.com/signup
## --------------------------------------

org=<ORG>
environment=<ENV>
credentials=<USER>:<PASSWD>
url="https://api.enterprise.apigee.com"


## Do not change anything below this line
## --------------------------------------
export org=$org
export environment=$environment
export credentials=$credentials
export url=$url

