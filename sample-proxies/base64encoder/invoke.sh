#!/bin/bash

echo Using org and environment configured in /setup/setenv.sh

source ../../setup/setenv.sh

set -x

curl "http://$org-$env.apigee.net/base64encoder?username=MyUserName&password=MyPasswordgrant_type=password" -v