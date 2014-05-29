#!/bin/bash

echo Using org and environment configured in /setup/setenv.sh

source ../../setup/setenv.sh

echo "Make sure you set your Azure credentials in /resources/jsc/api-config.js"

set -x

curl "http://$org-$env.$api_domain/outbound-oauth/search.json?lang=es&q=bicycle"