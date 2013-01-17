#!/bin/bash

echo Using org and environment configured in /setup/setenv.sh

source ../../setup/setenv.sh

set -x

curl "http://$org-$env.apigee.net/altitude?country=us&postalcode=08008"
