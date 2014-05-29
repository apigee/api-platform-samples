#!/bin/bash

echo Using org and environment configured in /setup/setenv.sh

source ../../setup/setenv.sh

set -x

curl "http://$org-$env.$api_domain/policy-mashup-cookbook?country=us&postalcode=08008"
