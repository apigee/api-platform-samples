#!/bin/sh

#Backup the original ApiProduct Payload

if [ ! -f CheapProduct.xml.orig ]; then
	cp CheapProduct.xml CheapProduct.xml.orig
	cp ExpensiveProduct.xml ExpensiveProduct.xml.orig
	cp FreeProduct.xml FreeProduct.xml.orig
fi

echo "Enter the ApiProxy to be used in ApiProduct:"

while [ -z $apiproxy ]; do
read apiproxy
done

echo "Filling the ProxyDetail in ApiProduct"

TMP_FILE=`mktemp /tmp/config.XXXXXXXXXX`
sed -e "s/PROXY/$apiproxy/" CheapProduct.xml > $TMP_FILE
mv $TMP_FILE CheapProduct.xml

TMP_FILE=`mktemp /tmp/config.XXXXXXXXXX`
sed -e "s/PROXY/$apiproxy/" ExpensiveProduct.xml > $TMP_FILE
mv $TMP_FILE ExpensiveProduct.xml

TMP_FILE=`mktemp /tmp/config.XXXXXXXXXX`
sed -e "s/PROXY/$apiproxy/" FreeProduct.xml > $TMP_FILE
mv $TMP_FILE FreeProduct.xml

