#!/bin/bash

# (C) Apigee 2014
#
# JSONTokenize
#
# Pulls JSON values out of a JSON input stream, printing them one per line.
# This is mostly useful for parsing simple JSON arrays, as the keys are not currently printed.
#
# Revision History:
# Date        Name         Changes
# 2013/07/31  Mike Dunker  original release

error () {
	echo "$*" >&2
	exit 1
}

STRIPQUOTES=0
SKIPEMPTY=1
ONEPERLINE=0
FIRSTTOKEN=1

# undocumented, not sure whether I need this
LEAFONLY=0

usage() {
	echo
	echo "Usage: JSONTokenize [-q] [-e] [-l]"
	echo
	echo "Parses JSON on stdin and returns JSON values in tree depth-first."
	echo
	echo "-q - Strips surrounding single or double quotes, if they exist."
	echo "-e - Print empty values. Empty values are skipped by default. Use with -l."
	echo "-l - Print one token per line."
	echo
}

options() {
	set -- "$@"
	local ARGCT=$#
	while [ $ARGCT -ne 0 ]
	do
		case $1 in
			-h) usage
				exit 0
			;;
			-q) STRIPQUOTES=1
			;;
			-e) SKIPEMPTY=0
			;;
			-l) ONEPERLINE=1
			;;
			-only) LEAFONLY=1
			;;
			?*) echo "ERROR: Unrecognized option: ${1:-EOF}."
				usage
				exit 0
			;;
		esac

		shift 1
		ARGCT=$((ARGCT-1))
	done
}

tokenize() {

	local ESC='(\\[^u[:cntrl:]]|\\u[0-9a-fA-F]{4})'
	local CHAR='[^[:cntrl:]"\\]'
	local STR="\"$CHAR*($ESC$CHAR*)*\""
	local NUM='-?(0|[1-9][0-9]*)([.][0-9]*)?([eE][+-]?[0-9]*)?'
	local KEYWORD='null|false|true'
	local SPACE='[[:space:]]+'

	egrep -ao --color=never "$STR|$NUM|$KEYWORD|$SPACE|." | egrep -v "^$SPACE$"
}

parse_array () {
	local idx=0
	local array=''

	# -r = don't treat \ as an escape character
	read -r token
	case "$token" in
		']') ;;
		*)
			while :
			do
				parse_value "$1" "$idx"
				idx=$((idx+1))
				array="$array""$value"
				read -r token
				case "$token" in
					']') break ;;
					',') array="$ary," ;;
					*) error "JSON FORMAT ERROR: expected ',' or ']', got ${token:-EOF}" ;;
				esac
				read -r token
			done
			;;
	esac
	value=
	:
}

parse_object () {
  local key
  local obj=''
  read -r token
  case "$token" in
    '}') ;;
    *)
      while :
      do
        case "$token" in
          '"'*'"') key=$token ;;
          *) throw "JSON FORMAT ERROR: expected a key string, got ${token:-EOF}" ;;
        esac
        read -r token
        case "$token" in
          ':') ;;
          *) throw "JSON FORMAT ERROR: expected ':', got ${token:-EOF}" ;;
        esac
        read -r token
        parse_value "$1" "$key"
        obj="$obj$key:$value"        
        read -r token
        case "$token" in
          '}') break ;;
          ',') obj="$obj," ;;
          *) throw "JSON FORMAT ERROR: expected ',' or '}',  GOT ${token:-EOF}" ;;
        esac
        read -r token
      done
    ;;
  esac
  value=
  :
}

parse_value() {
	local jpath="${1:+$1,}$2"
	local isleaf=0
	local isempty=0
	local print=0

	case "$token" in
		'{') parse_object "$jpath" ;;
		'[') parse_array "$jpath" ;;
		# anything that is not a digit must have more than one character
		''|[!0-9])	error "JSON FORMAT ERROR: expected a value, got ${token:-EOF}" ;;
		# if not { or [, must be a leaf
		*) value=$token
		   isleaf=1
		   [ "$value" = '""' ] && isempty=1
		   [ "$STRIPQUOTES" -eq 1 ] && value=`printf "%s" "$value" | sed "s/^\([\"']\)\(.*\)\1\$/\2/g"`
		   ;;
	esac

	[ "$value" = '' ] && return
	[ "$LEAFONLY" -eq 0 ] && [ "$SKIPEMPTY" -eq 0 ] && print=1
	[ "$LEAFONLY" -eq 1 ] && [ "$isleaf" -eq 1 ] && [ $SKIPEMPTY -eq 0 ] && print=1
	[ "$LEAFONLY" -eq 0 ] && [ "$SKIPEMPTY" -eq 1 ] && [ "$isempty" -eq 0 ] && print=1
	[ "$LEAFONLY" -eq 1 ] && [ "$isleaf" -eq 1 ] && [ $SKIPEMPTY -eq 1 ] && [ $isempty -eq 0 ] && print=1
	[ "$print" -eq 1 ] && [ "$FIRSTTOKEN" -eq 0 ] && [ "$ONEPERLINE" -eq 0 ] && printf " "
	[ "$print" -eq 1 ] && [ "$ONEPERLINE" -eq 0 ] && printf "%s" "$value"
	[ "$print" -eq 1 ] && [ "$ONEPERLINE" -eq 1 ] && printf "%s\n" "$value"
	FIRSTTOKEN=0
	:
}

parse () {
	read -r token
	parse_value
	read -r token
	case "$token" in
		'') ;;
		*) error "JSON FORMAT ERROR: expected EOF, got ${token:-EOF}" ;;
	esac
}

options "$@"

if ([ "$0" = "$BASH_SOURCE" ] || ! [ -n "$BASH_SOURCE" ]);
then
  tokenize | parse
fi
