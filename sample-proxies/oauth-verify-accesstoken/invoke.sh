#!/bin/bash

echo "Using org and environment configured in /setup/setenv.sh"
echo "Be sure to run scripts under ./setup/provisioning"

source ../../setup/setenv.sh

echo -e "\nDefine AccessToken grant_type:( authorization_code/[client_credentials] ):"
read grant_type

if [ -z $grant_type ]; then
	echo -e "Grant_Type defaults to 'client_credentials'. \n"
	grant_type="client_credentials"
fi

echo -e "Is the Proxy for the grant_type: $grant_type already deployed? ( [yes]/no ):"
read deploy_status

if [ "$deploy_status" != "no" ]; then
	deploy_status="yes"
fi

if [ "$grant_type" == "authorization_code" ]; then
	echo -e "Deploying proxy for Grant_Type: authorization_code \n"
	if [ $deploy_status != "yes" ]; then
		/bin/bash ../oauth-auth*/deploy.sh
	fi
	/bin/bash ../oauth-auth*/invoke.sh
else
	echo -e "Deploying proxy for Grant_Type: client_credentials \n"
        if [ $deploy_status != "yes" ]; then
		/bin/bash ../oauth-client*/deploy.sh
	fi
        /bin/bash ../oauth-client*/invoke.sh
fi

echo -e "\nAccessToken has be generated. Now we can access the protected resource with the above generated AccessToken"

echo -e "\nPass a valid AccessToken to verify it: [Hint: Steal the above shown Accesstoken!] "
read access_token


echo -e "\nRequesting the Protected Resource with AccessToken\n"

echo -e "curl -k https://$org-$env.$api_domain/weather/forecastrss?w=12797282 -H 'Authorization: Bearer $access_token' \n"

curl -k https://$org-$env.$api_domain/weather/forecastrss?w=12797282 -H "Authorization: Bearer $access_token"


echo -e "\nRequesting the Protected Resource with Invalid AccessToken\n"

echo -e "curl -k https://$org-$env.$api_domain/weather/forecastrss?w=12797282 -H 'Authorization: Bearer XYZ_INVALID_ACCESTOKEN_XYZ' \n"

curl -k https://$org-$env.$api_domain/weather/forecastrss?w=12797282 -H "Authorization: Bearer XYZ_INVALID_ACCESTOKEN_XYZ"

echo -e "\n\n"

echo -e "###################### TRY YOURSELF! ######################\n"
echo -e "Fire the below request multiple times in a minute, to see Ratelimiting getting implemented\n"

echo -e "curl -k https://$org-$env.$api_domain/weather/forecastrss?w=12797282 -H 'Authorization: Bearer $access_token' \n"
echo -e "###################### TRY YOURSELF! ######################\n"

echo -e "\n\n"
