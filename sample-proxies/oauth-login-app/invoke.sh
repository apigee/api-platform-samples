#!/bin/bash

echo Using org and environment configured in /setup/setenv.sh

echo Be sure to run scripts under ./setup/provisioning

source ../../setup/setenv.sh

echo Get app profile

echo "Enter your password for the Apigee Enterprise organization $org, followed by [ENTER]:"

while [ -z $password ]; do
	read -s password
done

######################################################################################################### 

echo -e "Fetching Callback URL, ConsumerKey & Secret for developer application 'joe-app' \n"
appdata=`curl -k -u "$username:$password" "$url/v1/o/$org/developers/joe@weathersample.com/apps/joe-app" 2>/dev/null`;
callback=`echo "$appdata" | grep callbackUrl | awk -F '\"' '{ print $4 }'`;
consumerkey=`echo "$appdata" | grep -m 1 consumerKey | awk -F '\"' '{ print $4 }'`;
consumersecret=`echo "$appdata" | grep -m 1 consumerSecret | awk -F '\"' '{ print $4 }'`;

######################################################################################################### 

echo -e "\nSelect the flow to continue: ([authorization_code], client_credentials, implicit):"
read grant_type

if [ -z $grant_type ]; then
	grant_type="authorization_code"
fi

######################################################################################################### 

GrantType_AuthCode () {
	
echo -e "Performing WebServer Flow: grant_type:authorization_code";
sleep 5
authorization_request="https://$org-$env.$api_domain/oauth/authorize?response_type=code&client_id=$consumerkey&redirect_uri=$callback&scope=READ&state=foobar"

echo -e "\nAuthorize the app by calling this endpoint on your browser:\n"
echo -e "*********************************************************************************************************************"
echo -e "$authorization_request \n"
echo -e "*********************************************************************************************************************"

echo -e "1. You will be redirected to the login page of the API Provider."
echo -e "2. Provide your credentials there. API Provider will validate your credentials."
echo -e "3. If the validation succeeds, then you will be redirected to the app with the Authorization Code. [Callback Url is given during App Registration]"

echo -e "\nThe API Provider Login Page Redirection URI:"
echo -e "https://$org-$env.$api_domain/oauth/samplelogingpage?client_id={request.queryparam.client_id}&response_type={request.queryparam.response_type}&scope={request.queryparam.scope}"

echo -e "\nOn successful authentication, login application invokes this url and it returns the Authorization Code to the App"
echo -e "https://$org-$env.$api_domain/oauth/authorizationcode?client_id=$consumerkey&response_type=code&app_enduser={userId}"

sleep 5
echo -e "\n\nNow, The App need to exchange the authorization code for the AccessToken"
echo -e "\nEnter the authorization code that app received"
read auth_code

while [ -z $auth_code ]; do
	read auth_code
done

accesstoken_request="https://$org-$env.$api_domain/oauth/token"

echo -e "\n	URL: POST $accesstoken_request
	HTTP Headers: 
		* Authorization (Basic HTTP Authentication of client_id and client_secret)
		* Content-Type : application/x-www-form-urlencoded
	Payload: code=$auth_code&grant_type=authorization_code&response_type=code \n\n"

echo -e "curl -k -u $consumerkey:$consumersecret $accesstoken_request -X POST -d \"code=$auth_code&grant_type=authorization_code&response_type=code\" -H 'Content-Type : application/x-www-form-urlencoded'"

accesstoken_response=`curl -k -u $consumerkey:$consumersecret $accesstoken_request -X POST -d "code=$auth_code&grant_type=authorization_code&response_type=code" 2>/dev/null`

echo -e "\n\nAccessToken Response \n $accesstoken_response \n"

#Extracting AccessToken & RefreshToken
access_token=`echo $accesstoken_response | awk -F "," '{ print $10 }' | awk -F ":" '{print $2}' | sed -e 's/[^a-zA-Z0-9]//g'`
refresh_token=`echo $accesstoken_response | awk -F "," '{ print $9 }' | awk -F ":" '{print $2}' | sed -e 's/[^a-zA-Z0-9]//g'`

echo -e "AccessToken: $access_token"
echo -e "RefreshToken: $refresh_token \n"

}

######################################################################################################### 

GrantType_Implicit () {

echo -e "\nPerforming Implicit Flow:";
sleep 5
authorization_request="https://$org-$env.$api_domain/oauth/authorize?response_type=token&client_id=$consumerkey&redirect_uri=$callback&scope=READ&state=foobar"

echo -e "\nAuthorize the app by calling this endpoint on your browser:\n"
echo -e "*********************************************************************************************************************"
echo -e "$authorization_request \n"
echo -e "*********************************************************************************************************************"

echo -e "1. You will be redirected to the login page of the API Provider."
echo -e "2. Provide your credentials there. API Provider will validate your credentials."
echo -e "3. If the validation succeeds, then you will be redirected to the app with the AccessToken. [Callback Url is given during App Registration]"

echo -e "\nThe API Provider Login Page Redirection URI:"
echo -e "https://$org-$env.$api_domain/oauth/samplelogingpage?client_id={request.queryparam.client_id}&response_type={request.queryparam.response_type}&scope={request.queryparam.scope}"

echo -e "\nOn successful authentication, login application invokes this url and it returns the AccessToken to the App"
echo -e "https://$org-$env.$api_domain/oauth/authorizationcode?client_id=$consumerkey&response_type=token&app_enduser={userId}"

}

######################################################################################################### 

GrantType_ClientCredentials () {

echo -e "\nPerforming Client Credentials Flow:";
sleep 5

accesstoken_request="https://$org-$env.$api_domain/oauth/token"

echo -e "\n	URL: POST $accesstoken_request
	HTTP Headers: 
		* Authorization (Basic HTTP Authentication of client_id and client_secret)
		* Content-Type : application/x-www-form-urlencoded
	Payload: grant_type=client_credentials \n\n"

echo -e "curl -k -u $consumerkey:$consumersecret $accesstoken_request -X POST -d \"grant_type=client_credentials\" -H 'Content-Type : application/x-www-form-urlencoded'"

accesstoken_response=`curl -k -u $consumerkey:$consumersecret $accesstoken_request -X POST -d "grant_type=client_credentials" 2>/dev/null`

echo -e "\n\nAccessToken Response \n $accesstoken_response \n"

#Extracting AccessToken & RefreshToken
access_token=`echo $accesstoken_response | awk -F "," '{ print $10 }' | awk -F ":" '{print $2}' | sed -e 's/[^a-zA-Z0-9]//g'`

echo -e "AccessToken: $access_token"

}

############################################### MAIN FLOW ############################################### 
if [ "$grant_type" == "authorization_code" ]; then
	GrantType_AuthCode
elif [ "$grant_type" == "implicit" ]; then
	GrantType_Implicit
elif [ "$grant_type" == "client_credentials" ]; then
	GrantType_ClientCredentials
else
	echo -e "\nPlease pass valid grant_type"
fi
######################################################################################################### 

echo "############################################### END ###############################################"

######################################################################################################### 
