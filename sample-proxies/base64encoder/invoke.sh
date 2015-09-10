#!/bin/bash

echo Using org and environment configured in /setup/setenv.sh

source ../../setup/setenv.sh

set -x

curl -i "https://$org-$env.$api_domain/base64encoder?username=MyUserName&password=MyPassword"
