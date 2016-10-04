#!/bin/bash

usage() { echo "Usage: $0 [-o] [-u] [-p] [-h]" ; exit 1;  }
if [ "$#" -ne "8" ]; then
	usage
	exit 1
fi

MGMT_URL="https://api.e2e.apigee.net"
DEVELOPER="healthcheck@apigee.com"
HOST="default"

echo "****************** ConfigureKVM script started at `TZ=":US/Pacific" date` by user at `echo $SSH_CLIENT | cut -d ' ' -f 1` ****************** "
pushd .

ORG=""
USERNAME=""
PASSWORD=""

while [[ $# > 1 ]]
do
  key="$1"

  case $key in
      -o)
        ORG="$2"
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
      *)
        echo "Invalid option: $key"
        usage
        exit
      ;;
  esac
  shift # past argument or value
done

export ORG=$ORG
export USERNAME=$USERNAME
export PASSWORD=$PASSWORD
export URL=$MGMT_URL
export DEVELOPER=$DEVELOPER
export HOST=$HOST

echo "Creating a KVM entry to Org:$ORG"
echo "$URL/v1/o/apigee-bot/e/test/keyvaluemaps/EdgeOrganizations/entries"
BODY="{ \"name\" : \"$ORG\", \"value\" : \"$DEVELOPER,apigee-healthcheck,/v0/apigee/healthcheck,$HOST\"}"
echo $BODY
response=`curl -s -o /dev/null -w "%{http_code}" $URL/v1/o/apigee-bot/e/test/keyvaluemaps/EdgeOrganizations/entries -u $USERNAME:$PASSWORD -X POST -H "content-type: application/json" -d "$BODY"`

echo "Response is: $response"

if [ $response -eq 401 ]
then
  echo "Authentication failed!"
  echo "Please re-run the script using the right username/password."
  exit
elif [ $response -eq 409 ]
then
  echo KVM entry already exists!
  echo "Do you want to update KVM instead? ([yes]/no):"
  read updateKVM

  if [ -z $updateKVM ] || [ "$updateKVM" = "yes" ]; then
  response=`curl -s -o /dev/null -w "%{http_code}" $URL/v1/o/apigee-bot/e/test/keyvaluemaps/EdgeOrganizations/entries/$ORG -u $USERNAME:$PASSWORD -X POST -H "content-type: application/json" -d "$BODY"`
    if [ $response -eq 200 ]
      then
      echo "KVM entry updated Successfully!"
    else
      echo "Try to update the KeyValueMap entry again!"
    fi
  else
    echo "Make sure you verify your KVM entry before testing"
  fi
  exit
else
  echo "Successfully created KVM entry!"
fi
