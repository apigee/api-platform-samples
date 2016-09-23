#!/bin/bash

## Ask the user for input.

source ../../setup/userconf.sh || exit 1

source ../scripts/deploy_proxy.sh

get_password || exit 1

## Deploy the proxy using apigeetool.

deploy_proxy

## All done.

