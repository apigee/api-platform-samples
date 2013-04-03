#!/bin/bash

# App Services configuration
# --------------------------
APP_SERVICES_ORG="Your App Services organization"
APP_SERVICES_APP="Your App Services application"
APP_SERVICES_COLLECTION="Your App Services collection"
APP_SERVICES_ENTITY=sample
# --------------------------

echo Using org and environment configured in /setup/setenv.sh

source ../../setup/setenv.sh

echo Using App Services org/app/collection/entity configured in invoke.sh

ENDPOINT=http://$org-$env.$api_domain/json-patch-app-services/$APP_SERVICES_ORG/$APP_SERVICES_APP/$APP_SERVICES_COLLECTION/$APP_SERVICES_ENTITY

set -x

# Create an entity
curl -X PUT -H "Content-Type: application-json" -d '{"data":{"a":"b"}}' $ENDPOINT

# Apply a patch: add the property "hello" with the string value "world"
curl -X PATCH -H "Content-Type: application-json" -d '[{"op": "add", "path": "/hello", "value": "world"}]' $ENDPOINT
