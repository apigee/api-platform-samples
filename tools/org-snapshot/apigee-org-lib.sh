#!/bin/bash

## (C) Apigee 2014
##
## apigee-org-lib.sh
##
## Library functions used to pull organizations.
##
## Used by apigee-getorg.sh.
##
## Revision History:
## Date        Name         Changes
## 2013/08/05  Mike Dunker  original release
## 2014/01/17  Mike Dunker  modifications for public release

## function dbgOut
## show/hide debug messages
##
dbgOut () {
  echo "$1 $2 $3 $4 $5 $6 $7 $8 $9" 1>&2
  :
}

## function logln
## send messages to log filelog
##
logln() {
	# stub, overwritten in apigee-setup.sh
  return 0
}
 
## function println
## echo and log
##
println() {
	if [ "$1" == "-e" ]; then
		shift
		echo -e "$@" 1>&2
	else
		echo -e "$@"
	fi
}

## function ex_mkdir
## recursively creates a folder and applies ownership
##
ex_mkdir() {
	mkdir -p "$1"
  if [ -n "$2" ]; then
    if [ -n "$3" ]; then
      chown -R "$2:$2" "$3"
	  else
		  chown -R "$2:$2" "$1"
    fi
	fi
}
	

## function ex_curl
## Print the curl command, omitting sensitive parameters, then run it. 
## 
ex_curl() {
  local outargs=()
  local allargs=()

  # grab the curl args, but skip the options, if any.
  while [ -n "$1" ]; do
      local arg="$1"
      allargs["${#allargs[@]}"]=$1
      if [ "${1:0:1}" == "-" ]; then
        shift
        allargs["${#allargs[@]}"]=$1
        if [ $arg == "-X" ]; then
          local method=$1
        fi
      else
        outargs["${#outargs[@]}"]=$1
      fi
      shift
  done

  println -e "--> curl -X ${method:-GET} ${outargs[@]} [...]" # show command immediately ...
  
  local result=`curl -v -k -s -w "\n==> %{http_code}" "${allargs[@]}"`  # run the curl command
  local curl_rc=`get_curl_returncode "${result}"`
  println "${result}"

  if [ "${curl_rc:0:2}" == "20" ]; then       # analyse the http status code
  	return 0
  else
  	return 1
  fi
}

## function get_curl_returncode
## get the HTTP response code from the output of ex_curl
##
get_curl_returncode() {
	echo "$1" | tail -1 | cut -b5-
}

## function get_curl_response
## get the HTTP response body from the output of ex_curl
##
get_curl_response() {
	echo "$1" | sed '$ d' # remove first & last line (cmd & response code)
}

## function get_input
## ask for input and handle default values and mandatory/optional values. 
## 
get_input() {
  input_msg=$1
  shift 
  local $*
  local isdone="n"
  local opt=""

  [ "${hidden}" == "y" ] && opt="-s -r"
  prompt="${input_msg}${default:+ ($default)}"
	logln "${prompt}"
	
  while [ "${isdone}" == "n" ]; do
    read ${opt} -p "${prompt}: " input
    [ -z "${input}" -a -n "${default}" ] && input="${default}" # take over default
    [ "${hidden}" == "y" ] && println -e        
    if [ "${verify}" == "y" ]; then 
      read ${opt} -p "${input_msg} for verification: " input2
      [ "${hidden}" == "y" ] && println -e      
    fi

    if [ -z "$input" -a -n "${default}" ]; then
      isdone="y"
      println ${def}
    elif [ -n "$input" -o "${mand:-n}" == "n" ]; then
      if [ "${verify}" != "y" -o "${input}" == "${input2}" ]; then
        isdone="y"
				if [ "${hidden}" == "y" ]; then
					echo "${input}"
				else
					println "${input}"
				fi
      else
        println -e "\n  Error: Inputs do not match, please repeat.\n"
      fi
    else
      println -e "\n  Error: Input mandatory, please repeat.\n"
    fi
  done
  println -e
}


## function check_result
## Exit execution if return code is not 0. 
## 
check_result() {
	local rcode=$1
	local smsg=$2
	local fmsg=$3

  if [ ${rcode} -eq 0 ]; then
    handle_success "${smsg}"
  else
    handle_failure "${fmsg}"
  fi
}

## function handle_failure
## Status message and optionally exit the script
##
handle_failure() {
	local msg=$1

  println "\n${msg}"
  read -p "Continue anyhow y/(n) " input
  println
  if [ "$input" != "y" ]; then
    exit 1
  fi
}

## function handle_failure
## Status message
##
handle_success() {
	local msg=$1

  println "\n${msg}"  
}

## function select_line
## Print some lines and ask the user to select one.
## Returns the selected line
## 
select_line() {
	local inputs=$1
	local msg=$2

  bifs=${IFS}
  IFS=$'\n'
  local lines=( ${inputs} )
  IFS=${bifs}

  if [ "${#lines[@]}" == "1" ]; then
    println "${inputs}"
  else 
    local i=0
    for line in ${lines[*]}; do 
      println "${i}) $line" 1>&2 
      (( i++ ))
    done
    read -p "Select a ${msg} (n=stop): " ind
    if [ "${ind}" == "n" ]; then 
      println "n"
    else
      println ${lines[$ind]}
    fi
  fi
}

## function get_part
## get the n-th part of a string separated by blanks
## 
get_part() {
	local str=$1
	local ind=$2
	local bifs=${IFS}

	IFS=" "
  local parts=( ${str} )
  IFS=${bifs}
  println ${parts[${ind}]} 
}

## function in_list
## check whether check_el is part of a space separated list
##
in_list() {
  local check_el=$1
  local list=$2
  local ind=""
  n=0
  for el in $list; do
    n=`expr $n + 1`
    if [ "${el%:*}" == "${check_el}" ]
    then
      ind=$n
    fi
  done
  println "${ind}"
}

## function get_sudo
## determines whether sudo is necesseray
##
get_sudo() {
  SUDO="sudo "
  REAL_USER=$(who -m)
  EFF_USER=$(id -un)
  [ "${REAL_USER%% *}" == "${EFF_USER}" ] && SUDO=""
  println ${SUDO}
}
	
## function ms_get_list
## gets a JSON array from a management server call, and returns as a newline-separated list
## 
## $1 = resourceURL
ms_get_list() {
  dbgOut ">>>ms_get_list" $1
  local resourceURL=$1
  local RESULT=`ex_curl -k -s -H "Accept: application/json" -u "${AEMAIL}:${APW}" -X GET "${resourceURL}"`
  local RETVAL=`get_curl_response "${RESULT}" | ./JSONTokenize.sh -l -q`
  echo -n "${RETVAL}"
}

## function ms_write_file
## gets a JSON/XML payload from a management server call, and writes it to the corresponding location in the bundle
## 
## $1 = resourceURL
## $2 = directory
## $3 = fileName minus extension
ms_write_file() {
  dbgOut ">>>ms_write_file" $1 $2 $3
  local resourceURL=$1
  local directory=$2
  local fileName=$3
  mkdir -p ${directory}
  local RESULT=`ex_curl -k -s -H "Accept: ${BUNDLE_FILE_ACCEPT}" -u "${AEMAIL}:${APW}" -X GET "${resourceURL}"`
  get_curl_response "${RESULT}" > ${directory}/${fileName}.${BUNDLE_FILE_EXT}
  :
}
