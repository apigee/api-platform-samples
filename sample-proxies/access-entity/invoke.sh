#!/bin/bash

echo Using org and environment configured in /setup/setenv.sh, $org and $env

source ../../setup/setenv.sh

curl http://$org-$env.apigee.net/access-entity?"apikey={Insert a valid API key here}" -i

echo This call requires a valid API key. You can use any API key for any app in your organization.