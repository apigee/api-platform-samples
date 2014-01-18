#!/bin/bash

## (C) Apigee 2014
##
## apigee-org-env.sh
##
## Environment variables used to pull organizations.
##
## Used by apigee-getorg.sh.
##
## Revision History:
## Date        Name         Changes
## 2013/08/05  Mike Dunker  original release
## 2014/01/17  Mike Dunker  modifications for public release

BUNDLE_NAME=apiconfig

## BUNDLE_FILE_EXT can be either "json" or "xml". This setting determines format of payloads.
BUNDLE_FILE_EXT=json
#BUNDLE_FILE_EXT=xml
BUNDLE_FILE_ACCEPT=application/${BUNDLE_FILE_EXT}

DEFAULT_ADMIN_EMAIL=email@example.com
DEFAULT_MS_SCHEME=https
DEFAULT_MS_HOST=api.enterprise.apigee.com
DEFAULT_MS_PORT=443
DEFAULT_MS_APIVER=v1
