#! /bin/bash
#	userconf.sh
# this script is intended to be dotted in by other scripts that use the
# standard learn-edge configuration variables:
#	org username env api_domain url
#
# there are 2 main cases to handle:
# (a) the user's $HOME/.learn-edge.rc file exists,
# in which case we just dot it in; or
# (b) it doesn't exist, in which case we prompt
# for the values and write out to the config file.
#

#
# prompt the user for the value of the named variable.
# take its current value as the default if the user
# enters an empty line.
#
_get_var()
{
	local var=$1; shift
	local curval=${!var}
	local default=${curval:+" ($curval)"}
	local prompt="=> Enter value for \$$var$default:"
	local TRIES=5
	local val i

	for ((i = 0; i < TRIES; i++)); do
		echo 1>&2 ""
		_hint_var "$var" 1>&2
		if ! IFS= read -e -r -p "$prompt" "$@" val; then
			echo 1>&2 $'\nGot EOF, giving up!'
			return 1
		fi
		if [[ -n "$val" ]]; then
			eval "$var=\$val"
		fi
		if _validate_var "$var"; then
			case "$var" in
			password) ;;
			*) echo 1>&2 "    Setting $var to ${!var}" ;;
			esac
			return 0
		fi
		echo 1>&2 "Invalid value, try again"
	done
	echo 1>&2 "Too many retries, giving up on $var!"
	return 1
}

#
# validate and/or cononicalize the current value
# of the given variable.
# return 1 if the value is not acceptable.
#
_validate_var()
{
	local var=$1
	if [[ -z "${!var}" ]]; then
		echo 1>&2 "Error: $var must not be null"
		return 1
	fi
	case "$var" in
	edgetype)
		case "$edgetype" in
		[Cc]*) edgetype=cloud ;;
		[Oo]*) edgetype=onprem ;;
		*) echo 1>&2 "Error: $var must be cloud or onprem"; return 1 ;;
		esac
		;;
	url)
		[[ "$edgetype" == cloud ]] && url=$dfl_url
		;;
	env)
		case "$env" in
		[Tt]*) env=test ;;
		[Pp]*) env=prod ;;
		*) echo 1>&2 "Error: $var must be test or prod"; return 1 ;;
		esac
		;;
	api_domain)
		[[ "$edgetype" == cloud ]] && api_domain=$dfl_api_domain
		;;
	esac
	return 0
}

#
# print a brief hint about the meaning of the given variable.
#
_hint_var()
{
	local var=$1
	local server=enterprise.apigee.com

	case $var in
	org)
		echo "Set \$$var to the name" \
			"of the organization tied to your apigee account."
		;;
	username)
		echo "Set \$$var to the email address" \
			"you use to login to $server ."
		;;
	password)
		echo "Enter the password for user $username on server $server".
		;;
	edgetype)
		echo "Set \$$var to cloud or onprem."
		;;
	env)
		echo "Set \$$var to your choice of test or prod ."
		;;
	url)
		if [[ "$edgetype" != cloud ]]; then
			echo "On prem users, set \$$var to" \
			    "the URL of your Apigee management server."
		fi
		if [[ "$edgetype" != onprem ]]; then
			echo "Cloud users, leave \$$var set to its default value."
		fi
		;;
	api_domain)
		if [[ "$edgetype" != cloud ]]; then
			cat<<EOF
On prem users, set \$$var to the base domain for your own Apigee API calls.
\$api_domain gets used in conjunction with
\$org and \$env to construct the base URL to your APIs:
https://\$org-\$env.\$api_domain/<api_resource>
EOF
		fi
		if [[ "$edgetype" != onprem ]]; then
			echo "Cloud users, leave \$$var set to its default value."
		fi
		;;
	esac
}

#
# prompt for all the given variables.
# give the user a chance to approve at the end.
#
_get_all_vars()
{
	local var
	local ok
	local prompt="Are these settings correct"

	api_domain=${api_domain:-$dfl_api_domain}
	url=${url:-$dfl_url}

	while :; do
		echo 1>&2 "====="
		for var in "${vars[@]}"; do
			case $var in
			url|api_domain)
				[[ "$edgetype" == cloud ]] && continue
				;;
			esac
			_get_var "$var" || return 1
		done

		echo 1>&2 $'\nYour new settings will be:'
		for var in "${vars[@]}"; do
			echo 1>&2 "    $var=${!var}"
		done

		#
		# prompt for approval.
		# note that read fails on EOF,
		# which is treated as a quit.
		#
		if ! read -e -r -p "$prompt [ynq] (y)?" ok; then
			echo 1>&2 $'\nGot EOF, giving up!'
			return 1
		fi

		case "X$ok" in
		X[Qq]*)
			echo 1>&2 "    Giving up!"
			return 1;;     # give up
		X[yY]*|X)
			echo 1>&2 "    Accepting these values."
			break ;;       # OK
		*)
			echo 1>&2 "    Retrying..."
			;;             # retry
		esac
	done
	echo 1>&2 "====="
	return 0
}

#
# print all the hints as a comment for placement in the config file.
#
_hint_comment()
{
	for var in "${vars[@]}"; do
		echo -n "* $var: "
		case "$var" in
		url|api_domain)
			edgetype="" _hint_var "$var"
			;;
		*)
			_hint_var "$var"
			;;
		esac
		echo ''
	done \
	| sed -e 's/^/# /'
}

#
# print out a quoted string for the given value.
# the quoted string is such that when bash evaluates it,
# the result will be identical to the original string.
# thus the value is "protected".
#
_protect()
{
	echo "\"$(sed -e 's/["\\\$]/\\&/g' <<< "$*")\""
}

#
# print the new contents of the config file.
# the caller has redirected stdout.
#
_print_conf()
{
	local var
	echo "# ----- User config settings for learn-edge"
	_hint_comment
	for var in "${vars[@]}"; do
		echo "export $var=$(_protect "${!var}")"
	done
	# config_ok signifies that the file was completely written
	echo "config_ok=y"
}

#
# prompt for the new contents of the config file,
# and write it out.
#
_redo_config()
{
	local conf=$1; shift
	echo 1>&2 $'\nRedoing user configuration...'

	if ! _get_all_vars; then
		echo 1>&2 "Error: could not get configuration info"
		return 1
	fi

	local old_umask=$(umask)
	umask 077
	_print_conf > "$conf"
	umask "$old_umask"

	echo 1>&2 "User configuration written to $conf ."
	return 0
}

#
# convenience routine to get the password in a standard way.
# get the password, verify it, try up to some number of times.
# return 1 on error.
# the password is stored in the variable "password".
#
get_password()
{
	local i
	for ((i = 0; i < 5; i++)); do
		password=
		_get_var password -s -p "Password:"
		echo 1>&2 ""
		_verify_credentials && return 0
	done
	return 1
}

#
# verify that the username and password variables work
# with the configured org and api_host (from url).
#
_verify_credentials()
{
	local api_host=${url#https://}
	printf "Verifying credentials on $api_host ..." 1>&2

	local response=`curl -s -o /dev/null -I -w "%{http_code}" https://api.enterprise.apigee.com/v1/organizations/$org -u $username:$password`

	case "$response" in
	20?)
		printf "\nCredentials verfied!\n\n" 1>&2
		return 0
		;;
	401)
		printf "\nAuthentication failed!\n" 1>&2
		printf "\nPlease re-run the script using the right username/password.\n\n" 1>&2
		return 1
		;;
	403)
		printf "\nOrganization $org is invalid!\n" 1>&2
		printf "Please re-run the script using the right org.\n" 1>&2
		return 1
		;;
	*)
		printf "Unknown error, try again.\n" 1>&2
		return 1
		;;
	esac
}

#
# read the config file.
# return 1 if something's wrong.
#
_read_config()
{
	local conf=$1
	local config_ok=''
	[[ -f "$conf" ]] && . "$conf" && [[ -n "$config_ok" ]]
}

#
# read the config.  if it failed, redo the config and try again.
#
_userconf_main()
{
	local conf=$HOME/.learn-edge.rc
	local vars=(edgetype env org username api_domain url)

	dfl_api_domain=apigee.net
	dfl_url=https://api.enterprise.apigee.com

	echo 1>&2 "Checking user configuration info ..."
	while ! _read_config "$conf"; do
		_redo_config "$conf" || return 1
	done
	return 0
}

# ----- start of mainline code
_userconf_main
