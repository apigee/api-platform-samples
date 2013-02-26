#!/bin/bash

echo "Using org and environment configured in /setup/setenv.sh"
echo "Be sure to run scripts under ./setup/provisioning"

source ../../setup/setenv.sh

echo "Get app profile"
echo "Enter your password for the Apigee Enterprise organization $org, followed by [ENTER]:"
read -s password

echo -e "Fetching callback URL and consumer key for developer application 'joe-app' \n"
appdata=`curl -k -u "$username:$password" "$url/v1/o/$org/developers/joe@weathersample.com/apps/joe-app" 2>/dev/null`;
callback=`echo "$appdata" | grep callbackUrl | awk -F '\"' '{ print $4 }'`;
consumerkey=`echo "$appdata" | grep -m 1 consumerKey | awk -F '\"' '{ print $4 }'`;
consumersecret=`echo "$appdata" | grep -m 1 consumerSecret | awk -F '\"' '{ print $4 }'`;


###### Authozation Code Flow Begins here......

authorization_request="https://$org-$env.$api_domain/weatheroauthauthcode/oauth/authorize?response_type=code&client_id=$consumerkey&redirect_uri=$callback&scope=READ&state=foobar"

echo -e "\nCalling Authorization Endpoint to get authorization code: \n"
echo -e "curl -k $authorization_request \n"

echo -e "Fetching redirect URL\n"
redirect_headers=`curl -k --head "$authorization_request" 2>/dev/null`

redirect_url=`echo "$redirect_headers" | grep "Location: " | sed -e 's/^Location: //' -e 's/[ \t\n\r]\$//g'`

echo -e "The app would now redirect to $callback"
echo -e "We will now simulate what would happen when authentication succeeded there.\n"

qsparams=`echo "$redirect_url" | awk -F "?" '{ print $2 }' | sed -e 's:&: :g'`;
for qsparam in $qsparams; do
	paramname=`echo "$qsparam" | awk -F "=" '{ print $1 }'`
	if [ "$paramname" = "code" ]; then
		authcode=`echo "$qsparam" | awk -F "=" '{ print $2 }' | sed -e 's/[^a-zA-Z0-9]//g'`
		echo "Authorization code is $authcode"
	fi
done

###### AccessToken Flow Begins here......

accesstoken_request="https://$org-$env.$api_domain/weatheroauthauthcode/oauth/accesstoken?grant_type=authorization_code"

echo -e "\nCalling AccessToken Endpoint to get access token\n"

echo -e "curl -k -u $consumerkey:$consumersecret $accesstoken_request -X POST -d \"code=${authcode}&redirect_uri=$callback&scope=READ\" -H \"Content-type: application/x-www-form-urlencoded\" \n\n"

accesstoken_response=`curl -k -u $consumerkey:$consumersecret $accesstoken_request -X POST -d "code=${authcode}&redirect_uri=$callback&scope=READ" -H "Content-type: application/x-www-form-urlencoded" 2>/dev/null`

echo -e "AccessToken Response \n $accesstoken_response \n"

#Extracting AccessToken & RefreshToken
access_token=`echo $accesstoken_response | awk -F "," '{ print $10 }' | awk -F ":" '{print $2}' | sed -e 's/[^a-zA-Z0-9]//g'` 
refresh_token=`echo $accesstoken_response | awk -F "," '{ print $9 }' | awk -F ":" '{print $2}' | sed -e 's/[^a-zA-Z0-9]//g'`

echo -e "AccessToken: $access_token"
echo -e "RefreshToken: $refresh_token \n"


###### RefreshToken Begins here......

echo -e "\nNow assume that the accesstoken got expired."
echo -e "It can be refreshed by calling to the refresh token endpoint, with the help of refreshtoken provided for the accesstoken\n"

refreshtoken_request="https://$org-$env.$api_domain/weatheroauthauthcode/oauth/refresh_accesstoken?grant_type=refresh_token"

echo -e "Calling RefreshToken Endpoint to get new access token\n"

echo -e "curl -k -u $consumerkey:$consumersecret $refreshtoken_request -X POST -d \"refresh_token=${refresh_token}\" -H \"Content-type: application/x-www-form-urlencoded\" \n\n"

new_accesstoken_response=`curl -k -u $consumerkey:$consumersecret $refreshtoken_request -X POST -d "refresh_token=${refresh_token}" -H "Content-type: application/x-www-form-urlencoded" 2>/dev/null`

echo -e "New AccessToken Response \n $new_accesstoken_response \n"

#Extracting AccessToken & RefreshToken
new_access_token=`echo $new_accesstoken_response | awk -F "," '{ print $9 }' | awk -F ":" '{print $2}' | sed -e 's/[^a-zA-Z0-9]//g'`
new_refresh_token=`echo $new_accesstoken_response | awk -F "," '{ print $8 }' | awk -F ":" '{print $2}' | sed -e 's/[^a-zA-Z0-9]//g'`

echo -e "New AccessToken: $new_access_token"
echo -e "New RefreshToken: $new_refresh_token \n\n"
