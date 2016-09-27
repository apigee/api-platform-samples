#!/bin/bash

## Ensure configuration variables have been set.
source ../../setup/userconf.sh || exit 1
get_password || exit 1

source ../scripts/deploy_proxy.sh

## Deploy the proxy using apigeetool.

deploy_proxy

## All done.