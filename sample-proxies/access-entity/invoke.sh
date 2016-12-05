#!/bin/bash
KEY="OOWhJEyTgbpGGB1AU3lATjdt7eM2vP2l"
source ../../setup/setenv.sh
echo "############################################################################################"
echo Using org and environment configured in /setup/setenv.sh, $org and $env
echo This call requires a valid API key. You can use any API key for any app in your organization.
echo "############################################################################################"


curl http://$org-$env.$api_domain/v1/access-entity/xml?apikey=$KEY -i

