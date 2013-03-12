#!/bin/sh

#Backup the original ApiProduct Payload

if [ ! -f CheapProduct.json.orig ]; then
	cp CheapProduct.json CheapProduct.json.orig
	cp ExpensiveProduct.json ExpensiveProduct.json.orig
	cp FreeProduct.json FreeProduct.json.orig
fi

if [ -z $1 ]; then
	echo "Enter the ApiProxy(ies) to attach in ApiProduct (Comma separated):"
	while [ -z $apiproxy ]; do
		read apiproxy
	done
else
	apiproxy=$1
fi


value=$apiproxy
apiproxy=`echo $value | sed -e 's/ //g' | sed -e 's/,/","/g'`

echo "Filling the ProxyDetail in ApiProduct"

TMP_FILE=`mktemp /tmp/config.XXXXXXXXXX`
sed -e "s/PROXY/\"$apiproxy\"/" CheapProduct.json > $TMP_FILE
mv $TMP_FILE CheapProduct.json

TMP_FILE=`mktemp /tmp/config.XXXXXXXXXX`
sed -e "s/PROXY/\"$apiproxy\"/" ExpensiveProduct.json > $TMP_FILE
mv $TMP_FILE ExpensiveProduct.json

TMP_FILE=`mktemp /tmp/config.XXXXXXXXXX`
sed -e "s/PROXY/\"$apiproxy\"/" FreeProduct.json > $TMP_FILE
mv $TMP_FILE FreeProduct.json

