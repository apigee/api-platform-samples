

#!/bin/bash

source ../setup/setenv.sh

echo "Enter a name for API proxy to be generated, followed by [ENTER]:"

read name

echo "Enter your password for the Apigee Enterprise organization $org, followed by [ENTER]:"

read -s password

echo Generating $name on $url using $username and $org

curl -H "Content-type:application/json" -X POST -d "{\"name\" : \"$name\"}"  https://api.enterprise.apigee.com/v1/o/$org/apis -u $username:$password

# curl -H "Content-type:application/json" -X POST d'{ "name" : "$name" }' https://api.enterprise.apigee.com/v1/o/$org/apis -u $username:$password

echo "Unless you see errors, your API has been created. Calling API to verify:"

curl https://api.enterprise.apigee.com/v1/o/$org/apis/$name -u $username:$password

echo "Now set the target URL for the backend service that you'll expose through Apigee (it doesn't have to belong to you--use http://weather.yahooapis.com if you like), followed by [ENTER]:"

read target_url

curl -u $username:$password -H "Content-Type: application/json" -X POST -d  "{\"connection\" : { \"uRL\" : \"$target_url\" }, \"name\" : \"default\" }" https://api.enterprise.apigee.com/v1/o/$org/apis/$name/revisions/1/targets

echo "Now set the URI pattern (format '/{some_uri}', e.g. /weather, to use for inbound request pattern matching, followed by [ENTER]:"

read basepath

curl -H "Content-type:application/json"  -X POST -d  "{ \"connection\" : {\"basePath\" : \"$basepath\", \"virtualHost\" : [ \"default\" ]}, \"name\" : \"default\", \"routeRule\" : [ {\"name\" : \"default\", \"targetEndpoint\" : \"default\"} ]}" https://api.enterprise.apigee.com/v1/o/$org/apis/$name/revisions/1/proxies -u $username:$password

echo Exporting API proxy to current local directory using $name on $url using $username and $org

echo "Exporting API proxy to current local directory--name the ZIP file, followed by [ENTER]:"

read zipname

curl https://api.enterprise.apigee.com/v1/o/$org/apis/$name/revisions/1?"format=bundle" > $name.zip \
-u $username:$password

echo "Checking directory for $name.zip"

ls

echo "Removing any existing API proxies, [ENTER] to continue:"

rm -r ./apiproxy

echo Unpacking

unzip $name.zip

echo "API proxy files are under ./apiproxy"

ls

echo "Creating /policies and /resources"

mkdir ./apiproxy/policies
mkdir ./apiproxy/resources

echo "Done"

echo "You can invoke you API proxy at http://$org-$env.apigee.net$basepath, and it will proxy requests to $target_url"

 






