#!/bin/bash


source ../../setup/setenv.sh
echo "Enter your password for the Apigee Enterprise organization $org, followed by [ENTER]:"

read -s password

curl -H "Content-type:text/xml" -X POST -d \
	'<Cache name="PaginationCache">
  	<Description>A Cache resource for the test environment.</Description>
   	<MaxElementsInMemory>100</MaxElementsInMemory>
    	<ExpirySettings>
      	<TimeoutInSec>300</TimeoutInSec>
	</ExpirySettings>
	<Compression>
		<MinimumSizeInKB>1024</MinimumSizeInKB>
	</Compression>
	</Cache>' \
			  https://api.enterprise.apigee.com/v1/o/${org}/environments/${env}/caches \
			  -u ${username}:${password}
