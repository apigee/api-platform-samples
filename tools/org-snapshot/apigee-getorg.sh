#!/bin/bash

## (C) Apigee 2014
##
## apigee-getorg.sh
##
## Retrieves org information from an Apigee Management Server.
##
## Usage: ./apigee-getorg.sh [-e admin-email] [-s mgmtserver] [-o org-name] [-d bundle-loc]
##
## User will be asked for password (or admin email, management server host, org name) if not
##   provided on command line.
##
## Revision History:
## Date        Name         Changes
## 2013/08/05  Mike Dunker  original release
## 2014/01/17  Mike Dunker  modifications for public release

MYDIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
. ./apigee-org-env.sh
. ./apigee-org-lib.sh

CFGFILE=./apigee-orgdef.cfg

## function dbgOut
## show/hide debug messages
##
dbgOut () {
  echo "$1 $2 $3 $4 $5 $6 $7 $8 $9" 1>&2
  :
}

error () {
  echo "$*" >&2
  exit 1
}

usage() {
	CMD=`basename $0`
  echo "Retrieves organization snapshot into directory."
	echo "Usage:"
	echo "$CMD [-e admin-email] [-s mgmtserver] [-o org-name] [-d bundle-loc] [-n bundle-dirname]"
	echo "                admin-email:    email of global system admin"
	echo "                mgmtserver:     management server hostname"
	echo "                org-name:       name of organization"
	echo "                bundle-loc:     location for $BUNDLE_NAME directory, defaults to current directory"
  echo "                bundle-dirname: bundle directory name, defaults to $BUNDLE_NAME"
	exit 1
}

AEMAIL=
ORGNAME=
APW=
SERVERHOST=
BUNDLELOC=.

while getopts ":s:e:o:P:d:h" opt
do
  case $opt in
    s)  SERVERHOST=$OPTARG ;;
    e)  AEMAIL=$OPTARG ;;
    o)  ORGNAME=$OPTARG ;;
    P)  APW=$OPTARG ;;
    d)  BUNDLELOC=$OPTARG ;;
    h)  usage ;;
	*)  usage
  esac
done

SCHEME="${DEFAULT_MS_SCHEME}"
PORT="${DEFAULT_MS_PORT}"
APIVER="${DEFAULT_MS_APIVER}"

BUNDLEROOT="${BUNDLELOC}/${BUNDLE_NAME}"

[ -e "${BUNDLEROOT}" ] && error "Bundle '${BUNDLEROOT}' already exists. Please remove or choose another location."

[ -z "${AEMAIL}" ] && AEMAIL=`get_input "Enter system admin email address" mand=y default="${DEFAULT_ADMIN_EMAIL}"`
[ -z "${APW}" ] && APW=`get_input "Enter system admin password" hidden=y mand=y`
[ -z "${SERVERHOST}" ] && SERVERHOST=`get_input "Enter root management server host address" mand=y default="${DEFAULT_MS_HOST}"`

[ -z "${ORGNAME}" ] && ORGNAME=`get_input "Enter organization name" mand=y`

URLROOT="${SCHEME}://${SERVERHOST}:${PORT}/${APIVER}/o"

STARTINGRESOURCETYPENAME="o"
STARTINGBASEURL="${URLROOT}"
STARTINGBASEDIRECTORY="${BUNDLEROOT}"
STARTINGRESOURCENAME="${ORGNAME}"

echo
echo "Get Organization Configuration Data"

RESOURCENAMES=()
RESOURCEPARENTS=()
RESOURCEURLS=()
RESOURCEFILES=()
RESOURCETYPES=()
RESOURCECOUNT=0

## reads the URL structure table into arrays
read_config() {
  dbgOut "read_config"
  while read line
  do
    if [ ${line:0:1} != "#" ]
    then
      local oldIFS="$IFS"
      IFS=':'
      array=( ${line} )
      IFS="$oldIFS"
      if [ ${array[0]} != "" ]
      then
        local name="${array[0]}"
        local parent="${array[1]:-"o"}"
        local url="${array[2]:-${name}}"
        local file="${array[3]:-${url}}"
        local rtype="${array[4]:-"LIST"}"
        RESOURCENAMES+=( "${name}" )
        RESOURCEPARENTS+=( "${parent}" )
        RESOURCEURLS+=( "${url}" )
        RESOURCEFILES+=( "${file}" )
        RESOURCETYPES+=( "${rtype}" )
        (( RESOURCECOUNT++ ))
      fi
    fi
  done < ${CFGFILE}
}

## Retrieves the resource at baseURL and finds sub resource types,
##   recursively calling them.
##
## $1 = resourceTypeName
## $2 = baseURL
## $3 = baseDirectory
## $4 = resourceName
get_resource_and_subtypes() {
  dbgOut "get_resource_and_subtypes" $1 $2 $3 $4
  local resourceTypeName=$1
  local baseURL=$2
  local baseDirectory=$3
  local resourceName=$4
  local idx=0

  # get the resource at baseURL and store
  ms_write_file "${baseURL}/${resourceName}" "${baseDirectory}" "${resourceName}"

  # loop over subtypes
  while [ ${idx} -lt ${RESOURCECOUNT} ]
  do
    local parent="${RESOURCEPARENTS[$idx]}"
    # if subtype is a child of this resource
    if [ ${parent} == ${resourceTypeName} ]
    then
      local childResourceType=${RESOURCETYPES[$idx]}
      local childResourceURL=${RESOURCEURLS[$idx]}
      local childResourceFile=${RESOURCEFILES[$idx]}

      if [ ${childResourceType} == "LEAF" ]
      then
        # if this is a leaf, get and store the associated file
        ms_write_file "${baseURL}/${resourceName}/${childResourceURL}" "${baseDirectory}/${resourceName}/${childResourceURL}" "${childResourceFile}"

      else
        # if this is not a leaf, call get_resource_items
        get_resource_items ${idx} "${baseURL}/${resourceName}" "${baseDirectory}/${resourceName}/${childResourceFile}"

      fi

    fi

    (( idx++ ))

  done
  :
}

## Retrieves the resource items for the resource type specified in idx
##   recursively calling them.
##
## $1 = idx into RESOURCE* arrays
## $2 = baseURL
## $3 = baseDirectory
get_resource_items() {
  dbgOut "get_resource_items" $1 $2 $3
  local idx=$1
  local baseURL=$2
  local baseDirectory=$3
  local resourceName=${RESOURCENAMES[$idx]}
  local resourceType=${RESOURCETYPES[$idx]}
  local resourceURL=${RESOURCEURLS[$idx]}

  # first, get the list of resource items
  local cmd="ms_get_list ${baseURL}/${resourceURL}"
  local oldIFS="$IFS"
  IFS=$'\n'
  local resourceItems=( `eval $cmd` )
  IFS="$oldIFS"

  # loop over items
  for resourceItem in "${resourceItems[@]}"
  do
    # for each item, recursively call get_resource_and_subtypes
    get_resource_and_subtypes "${resourceName}" "${baseURL}/${resourceURL}" "${baseDirectory}" "${resourceItem}"

  done
}

read_config

get_resource_and_subtypes ${STARTINGRESOURCETYPENAME}  ${STARTINGBASEURL} ${STARTINGBASEDIRECTORY} ${STARTINGRESOURCENAME} 
