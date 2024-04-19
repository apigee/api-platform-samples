#!/bin/bash

# Copyright 2015 Apigee Corporation, 2024 Google LLC
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#      http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

[[ -z "$APIGEE_HOST" ]] && source ../../setup/setenv.sh

MISSING_ENV_VARS=()
[[ -z "$APIGEE_HOST" ]] && MISSING_ENV_VARS+=('APIGEE_HOST')

[[ ${#MISSING_ENV_VARS[@]} -ne 0 ]] && {
    printf -v joined '%s,' "${MISSING_ENV_VARS[@]}"
    printf "You must set these environment variables: %s\n" "${joined%,}"
    exit 1
}

url="${APIGEE_HOST}/samplet-extract-variables?code=DBNabc123"
echo -e "\n\nAPI 1 of 2: ${url}"
read -p "Press Return to call this API..."
curl "$url"

url="${APIGEE_HOST}/samplet-extract-variables/resource1/DBNabc123"
echo -e "\n\nAPI 2 of 2: ${url}"
read -p "Press Return to call this API..."
curl "$url"

echo -e "\n\n"
