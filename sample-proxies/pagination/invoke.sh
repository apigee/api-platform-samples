#!/bin/bash

echo Using org and environment configured in /setup/setenv.sh, $org and $env

source ../../setup/setenv.sh

# For fun, you can change the values of offset and limit to see how they affect the result set.

curl http://$org-$env.$api_domain/pagination?"session_id=1&offset=1&limit=2"
