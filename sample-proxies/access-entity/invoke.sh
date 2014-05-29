#!/bin/bash

source ../../setup/setenv.sh
echo "############################################################################################"
echo Using org and environment configured in /setup/setenv.sh, $org and $env
echo This call requires a valid API key. You can use any API key for any app in your organization.
echo "############################################################################################"


curl http://$org-$env.$api_domain/access-entity?"apikey=EiED85iHG4ChduZh8qzDAlWcJUF3wqi2" -i

