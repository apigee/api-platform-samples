# This script will generate an API backend in UserGrid.
# Set up an account at https://accounts.apigee.com/accounts/sign_up
# Do not use production accounts for this sample!!

source ./APIBaaS_credentials.sh

echo "Did you update the file APIBaaS_credentials.sh with your UserGrid credentials?"

echo "If so, enter a name for your app. This will be created on UserGrid"

echo "Press [ENTER]:"

read app

echo Calling AccessToken Endpoint to get access token

set -x

accesstoken_response=`curl "https://api.usergrid.com/management/token" -X POST -d '{ "client_id": "'$client_id'" , "client_secret" : "'$client_secret'", "grant_type" : "client_credentials" }' 2>/dev/null`

echo Extracting access token from response

access_token=`echo $accesstoken_response | tr ',' '\n' | grep 'access_token' | awk -F ":" '{print $2}' | sed -e 's/\"//g;s/ //g'`

# For reference the the response looks like this:
# 
# {"access_token":"YWMtH5e0RpmOEeOqkKshF52pBAAAAURvUGi4cZTQ5TiPIIpEuz_SAykMzr4Mx3E","expires_in":604800,"application":"1fdf5be0-98d3-11e3-aef3-b338f37fceb5"}

echo Creating an app called $app on UserGrid in organization $org

set -x

curl -X POST "https://api.usergrid.com/management/orgs/$org/apps?access_token=$access_token" -d '{"name":"'$app'"}'

echo Making $app into a sandbox app by relaxing RBAC--remeber this is INSECURE and only for demonstration!

curl -X POST "https://api.usergrid.com/$org/$app/roles/guest/permissions?access_token=$access_token" -d '{"permission":"get,put,post,delete:/**" }'

echo $app is now totally insecure. Use it only for demo purposes.

echo Adding movies

curl -X POST https://api.usergrid.com/$org/$app/movies -d '{ "id": 1, "name" : "Breathless", "director" : "Jean-Luc Godard", "writer" : "Francois Truffaut", "release_date" : 1960}'

echo For fun, make an API call to see what we added.

set -x

curl -X POST https://api.usergrid.com/$org/$app/movies

echo You now have an API backend called $app that your mobile app can call at this URL: https://api.usergrid.com/$org/$app/movies




