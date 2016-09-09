#!/bin/bash

usage() { echo "Usage: $0 [-o][org1,org2...] [-e] [-u] [-p] [-h][optional] [-configure][yes/no][optional]" ; exit 1;  }
if [ "$#" -lt "8" ]; then
	usage
	exit 1
fi

MGMT_URL="https://api.e2e.apigee.net"
DEVELOPER="healthcheck@apigee.com"
CONFIGURE="yes"
HOST="default"

echo "****************** Setup script started at `TZ=":US/Pacific" date` by user at `echo $SSH_CLIENT | cut -d ' ' -f 1` ****************** "
#pushd .

ORG=""
ENV=""
USERNAME=""
PASSWORD=""

while [[ $# > 1 ]]
do
  key="$1"

  case $key in
      -o)
        ORG="$2"
        set -f # disable glob
        IFS=',' # split on space characters
        orgs=($2)
        shift # past argument
        ;;
      -e)
        ENV="$2"
        shift # past argument
        ;;
      -u)
        USERNAME="$2"
        shift # past argument
        ;;
      -p)
        PASSWORD="$2"
        shift # past argument
        ;;
      -h)
        HOST="$2"
        shift # past argument
        ;;
      -configure)
        CONFIGURE="$2"
        shift # past argument
        ;;
      *)
        echo "Invalid option: $key"
        usage
        exit
      ;;
  esac
  shift # past argument or value
done

#export ORG=$ORG
export USERNAME=$USERNAME
export PASSWORD=$PASSWORD
export ENV=$ENV
export URL=$MGMT_URL
export DEVELOPER=$DEVELOPER

#Zip proxy folder
zip -r apigee-healthcheck.zip apiproxy

echo "Number of orgs: ${#orgs[@]}"
echo "Creating entities for these Organizations: "
#echo -n "Arguments are:"
for i in "${orgs[@]}"; do
  echo " ${i}"
done

for ORG in "${orgs[@]}"; do
#IMPORT
echo "Importing apigee-healthcheck proxy to Org:$ORG"
echo "$URL/v1/o/$ORG/apis?action=import&name=apigee-healthcheck"
curl -X POST -u $USERNAME:$PASSWORD -H "content-type: multipart/form-data" -F "file=@apigee-healthcheck.zip" "$URL/v1/o/$ORG/apis?action=import&name=apigee-healthcheck"

#DEPLOY
echo "Deploying apigee-healthcheck proxy to Org:$ORG"
echo "$URL/v1/o/$ORG/apis/apigee-healthcheck/revisions/1/deployments?action=deploy&env=$ENV"
echo @apiproduct.json
curl -u $USERNAME:$PASSWORD -H "content-type: application/octet-stream" "$URL/v1/o/$ORG/apis/apigee-healthcheck/revisions/1/deployments?action=deploy&env=$ENV" -i -X POST

#CREATE APIPRODUCT
echo "Creating API Product- \"apigee-healthcheck\" to Org:$ORG"
echo "$URL/v1/o/$ORG/apiproducts"
echo @apiproduct.json
curl -v $URL/v1/o/$ORG/apiproducts -X POST -d @apiproduct.json -H "Content-Type:application/json" -u $USERNAME:$PASSWORD

#CREATE DEVELOPER
echo "Creating a Developer- $DEVELOPER to Org:$ORG"
echo "$URL/v1/o/$ORG/developers"
echo @developer.json
curl -v $URL/v1/o/$ORG/developers -X POST -d @developer.json -H "Content-Type:application/json" -u $USERNAME:$PASSWORD

#CREATE DEVELOPER APP
echo "Creating a Developer App - apigee-healthcheck to Org:$ORG"
echo "$URL/v1/o/$ORG/developers"
echo @developerApp.json
curl -v $URL/v1/o/$ORG/developers/$DEVELOPER/apps -X POST -d @developerApp.json -H "Content-Type:application/json" -u $USERNAME:$PASSWORD

done

if [ -z $CONFIGURE ] || [ "$CONFIGURE" = "yes" ]; then
  echo "Executing script to Create KVM entry"
  #sh ./cleanup.sh
  for ORG in "${orgs[@]}"; do
    sh configureKVM.sh -o $ORG -u $USERNAME -p $PASSWORD -h $HOST
  done
else
  echo "****************** Make sure you create KVM entry / execute configureKVM script, before testing ****************** "
fi

echo "Setup Completed!"