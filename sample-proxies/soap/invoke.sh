#!/bin/bash

echo Using org and environment configured in /setup/setenv.sh

source ../../setup/setenv.sh

set -x

curl https://$org-$env.$api_domain/simplesoap?wsdl
