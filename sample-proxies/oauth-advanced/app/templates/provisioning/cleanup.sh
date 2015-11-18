#!/bin/bash
# enter password as first argument or script will prompt you for it

if [ $# -ne 5 ]
then
  echo "Usage: $0 OrgName Environment Username Password MSURL"
  echo "For example: $0 myorg prod test@example.com apigee123 https://api.enterprise.apigee.com"
  exit 1
fi

org=$1
env=$2
username=$3
password=$4
url=$5

echo using $username and $org

#del loginapp meta

echo "Deleting Apps"

curl -u $username:$password $url/v1/o/$org/developers/loginappdev@example.com/apps/login-app -X DELETE

echo "Deleting Developers"

curl -u $username:$password $url/v1/o/$org/developers/loginappdev@example.com -X DELETE

echo "Deleting Products"

curl -u $username:$password $url/v1/o/$org/apiproducts/login-app-product -X DELETE

#del webapp meta

echo "Deleting Apps"

curl -u $username:$password $url/v1/o/$org/developers/webdev@example.com/apps/webserver-app -X DELETE

echo "Deleting Developers"

curl -u $username:$password $url/v1/o/$org/developers/webdev@example.com -X DELETE

echo "Deleting Products"

curl -u $username:$password $url/v1/o/$org/apiproducts/webserver-product -X DELETE

echo "Undeploy 4 APIs"

curl -u $username:$password "$url/v1/organizations/$org/apis/oauth2/revisions/1/deployments?action=undeploy&env=$env" -X POST -H "Content-Type: application/octet-stream"
curl -u $username:$password "$url/v1/organizations/$org/apis/webserver-app/revisions/1/deployments?action=undeploy&env=$env" -X POST -H "Content-Type: application/octet-stream"
curl -u $username:$password "$url/v1/organizations/$org/apis/login-app/revisions/1/deployments?action=undeploy&env=$env" -X POST -H "Content-Type: application/octet-stream"
curl -u $username:$password "$url/v1/organizations/$org/apis/user-mgmt-v1/revisions/1/deployments?action=undeploy&env=$env" -X POST -H "Content-Type: application/octet-stream"

echo "Delete 4 APIs"

curl -u $username:$password -X DELETE "$url/v1/organizations/$org/apis/oauth2"
curl -u $username:$password -X DELETE "$url/v1/organizations/$org/apis/webserver-app"
curl -u $username:$password -X DELETE "$url/v1/organizations/$org/apis/login-app"
curl -u $username:$password -X DELETE "$url/v1/organizations/$org/apis/user-mgmt-v1"

echo "Cleanup Completed"
