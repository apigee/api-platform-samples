#!/bin/bash

rawurlencode() {
  local string="${1}"
  local strlen=${#string}
  local encoded=""

  for (( pos=0 ; pos<strlen ; pos++ )); do
     c=${string:$pos:1}
     case "$c" in
        [-_.~a-zA-Z0-9] ) o="${c}" ;;
        * )               printf -v o '%%%02x' "'$c"
     esac
     encoded+="${o}"
  done
  echo "${encoded}"
}

echo "Using org and environment configured in /setup/setenv.sh"
echo "Be sure to run scripts under ./setup/provisioning"

source ../../setup/setenv.sh

echo "Get app profile"
echo "Enter your password for the Apigee Enterprise organization $org, followed by [ENTER]:"
read -s password

echo "Fetching callback URL and consumer key for developer application 'joe-app'"
appdata=`curl -k -u "$username:$password" "$url/v1/o/$org/developers/joe@weathersample.com/apps/joe-app" 2>/dev/null`;
callback=`echo "$appdata" | grep callbackUrl | awk -F '\"' '{ print $4 }'`;
consumerkey=`echo "$appdata" | grep -m 1 consumerKey | awk -F '\"' '{ print $4 }'`;
consumersecret=`echo "$appdata" | grep -m 1 consumerSecret | awk -F '\"' '{ print $4 }'`;

echo "Fetching redirect URL"
sleep 1
redirect_headers=`curl -k --head "https://$org-$env.$api_domain/weatheroauthauthcode/oauth/authorize?response_type=code&client_id=$consumerkey&redirect_uri=$callback&scope=READ&state=foobar" 2>/dev/null`
sleep 1
redirect_url=`echo "$redirect_headers" | grep "Location: " | sed -e 's/^Location: //' -e 's/[ \t\n\r]\$//g'`

echo "The app would now redirect to $redirect_url"
echo "We will now simulate what would happen when authentication succeeded there."

qsparams=`echo "$redirect_url" | awk -F "?" '{ print $2 }' | sed -e 's:&: :g'`;
for qsparam in $qsparams; do
	paramname=`echo "$qsparam" | awk -F "=" '{ print $1 }'`
	if [ "$paramname" = "code" ]; then
		authcode=`echo "$qsparam" | awk -F "=" '{ print $2 }' | sed -e 's/[^a-zA-Z0-9]//g'`
		echo "Authorization code is $authcode"
	fi
done

token_request_url="https://$org-$env.$api_domain/weatheroauthauthcode/oauth/accesstoken?grant_type=authorization_code&code=${authcode}&redirect_uri=$( rawurlencode $redirect_url )&scope=READ"
echo "Calling $token_request_url"
tokenoutput=`curl -k -u "$consumerkey:$consumersecret" "$token_request_url" 2>/dev/null`
echo "$tokenoutput"
