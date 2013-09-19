#!/bin/bash

echo "Using org and environment configured in /setup/setenv.sh"
echo "Be sure to run scripts under ./setup/provisioning"

source ../../setup/setenv.sh

echo "Get app profile"
echo "Enter your password for the Apigee Enterprise organization $org, followed by [ENTER]:"
read -s password

echo -e "Fetching consumer key for developer application 'joe-app' \n"
appdata=`curl -k -u "$username:$password" "$url/v1/o/$org/developers/joe@weathersample.com/apps/joe-app" -H 'Accept: application/json' 2>/dev/null`;
consumerkey=`echo "$appdata" | grep -m 1 consumerKey | awk -F '\"' '{ print $4 }'`;
consumersecret=`echo "$appdata" | grep -m 1 consumerSecret | awk -F '\"' '{ print $4 }'`;

echo -e "\n#########################################################################\n"

#1. Generate RequestToken:
request_token_request="https://$org-$env.$api_domain/oauth1/3leg/request_token -H 'Authorization: OAuth oauth_callback=\"oob\", oauth_signature_method=\"HMAC-SHA1\", oauth_token=\"\", oauth_consumer_key=\"$consumerkey\", oauth_timestamp=\"{timestamp}\", oauth_nonce=\"{nonce}\", oauth_version=\"1.0\", oauth_signature=\"{signature}\"'"

echo -e "Sample RequestToken Request:\ncurl -i" $request_token_request

echo -e "\n#########################################################################\n"

#2. Generate Verifier:
verifier_request="https://$org-$env.$api_domain/oauth1/3leg/verifier -X POST -d 'token={request_token}&appenduser={app_end_user}&verifier={verifier_code}'"

echo -e "Sample Verifier Code Generation Request:\ncurl -i" $verifier_request

echo -e "\n#########################################################################\n"

#3. Generate AccessToken:
access_token_request="https://$org-$env.$api_domain/oauth1/3leg/access_token -H 'Authorization: OAuth oauth_verifier=\"{verifier_code}\", oauth_signature_method=\"HMAC-SHA1\", oauth_token=\"{request_token}\", oauth_consumer_key=\"$consumerkey\", oauth_timestamp=\"{timestamp}\", oauth_nonce=\"{nonce}\", oauth_version=\"1.0\", oauth_signature=\"{signature}\"'"

echo -e "Sample AccessToken Request:\ncurl -i" $access_token_request

echo -e "\n#########################################################################\n"

#4. Verify AccessToken:
verify_accesstoken_request="https://$org-$env.$api_domain/oauth1/get -H 'Authorization: OAuth oauth_signature_method=\"HMAC-SHA1\", oauth_token=\"{access_token}\", oauth_consumer_key=\"$consumerkey\", oauth_timestamp=\"{timestamp}\", oauth_nonce=\"{nonce}\", oauth_version=\"1.0\", oauth_signature=\"{signature}\"'"

echo -e "Sample Verify AccessToken Request:\ncurl -i" $verify_accesstoken_request

echo -e "\n#########################################################################\n"
