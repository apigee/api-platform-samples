#!/bin/sh

usage() { echo "Usage: $0 [-o][org1,org2...] [-u] [-p] [-e]" ; exit 1;  }
if [ "$#" -ne "8" ]; then
	usage
	exit 1
fi

echo "****************** Cleanup script started at `TZ=":US/Pacific" date` by user at `echo $SSH_CLIENT | cut -d ' ' -f 1` ****************** "

MGMT_URL="https://api.e2e.apigee.net"
DEVELOPER="healthcheck@apigee.com"
ORG=""
USERNAME=""
PASSWORD=""
ENV=""
APP="apigee-healthcheck"
PRODUCT="apigee-healthcheck"

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
      -u)
        USERNAME="$2"
        shift # past argument
        ;;
      -p)
        PASSWORD="$2"
        shift # past argument
        ;;
      -e)
        ENV="$2"
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
export URL=$MGMT_URL
export DEVELOPER=$DEVELOPER

echo "Number of orgs: ${#orgs[@]}"
echo "Deleting entities for these Organizations: "
#echo -n "Arguments are:"
for i in "${orgs[@]}"; do
  echo " ${i}"
done

for ORG in "${orgs[@]}"; do
echo "Deleting App"

curl -u $USERNAME:$PASSWORD $URL/v1/o/$ORG/developers/$DEVELOPER/apps/$APP -X DELETE

echo "Deleting Developer"

curl -u $USERNAME:$PASSWORD $URL/v1/o/$ORG/developers/$DEVELOPER -X DELETE

echo "Deleting Product"

curl -u $USERNAME:$PASSWORD $URL/v1/o/$ORG/apiproducts/$PRODUCT -X DELETE

echo "Undeploy & Delete apigee-healthcheck proxy"

#UNDEPLOY
echo "UnDeploying apigee-healthcheck proxy from Org:$ORG"
echo "$URL/v1/o/$ORG/environments/$ENV/apis/apigee-healthcheck/revisions/1/deployments"
curl -X DELETE -u $USERNAME:$PASSWORD "$URL/v1/o/$ORG/environments/$ENV/apis/apigee-healthcheck/revisions/1/deployments"
#curl -X POSt -u $USERNAME:$PASSWORD "$URL/v1/o/$ORG/apis/apigee-healthcheck/revisions/1/deployments?action=undeploy&env=$ENV&force=force"

#DELETE 
echo "Deleting apigee-healthcheck proxy from Org:$ORG"
echo "$URL/v1/o/$ORG/apis/apigee-healthcheck"
curl -X DELETE -u $USERNAME:$PASSWORD -H "content-type: application/json" "$URL/v1/o/$ORG/apis/apigee-healthcheck"

#DELETE KVM entry
echo "Deleting KVM entry"
echo "$URL/v1/o/apigee-bot/environments/test/keyvaluemaps/EdgeOrganizations/entries/$ORG"
curl -X DELETE -u $USERNAME:$PASSWORD -H "content-type: application/json" "$URL/v1/o/apigee-bot/environments/test/keyvaluemaps/EdgeOrganizations/entries/$ORG"
done	

echo "\nCleanup Completed\n"
