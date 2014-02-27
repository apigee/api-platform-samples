# API Pagination

This sample shows how to perform a simple "Pagination of data" using javascript policy. 

It caches the offset and limit based on user_id header and based on that it paginates.
 
It uses these policies:

CacheLimit.xml -  It caches the Limit value
CacheOffset.xml - It caches the offset value
CacheResponse.xml - Response Cache
ContentListings.xml - Policy that mocks up 100 book entries
GetPaginationParams.xml  - This policy extracts query parameters.
LookupLimit.xml - Looks up the cache to get the cached Limit
LookupOffset.xml - This looks up the offset value
Pagination.xml - This is the javascript policy to paginate the data.


#Explaination
You have to set two headers:

user_id : this is used to store the pagination configuration(offset and limit) into cache by user_id.
bypass-cache: TRUE value means ignore cache, FALSE value means lookup for a response in cache. This value is affecting just the response cache policy.

Ex:

request.header.user_id = tester1
request.header.bypass-cache = true

Once you set the pagination configuration by user_id, the queryparams are not needed anymore, however you must provide a user_id to retrieve the pagination configuration and the next page. Once you reach the last page, the next request will retrieve the first page.


Complete example:

First request (first page and pagination configuration):
curl -H "user_id: tester1" -H "bypass-cache: true"  http://${host}/v1/demo/content-listing?offset=0&limit=10

This will return the first 10 entries. 

Second and further requests (next page or first page after you reach the last page):

curl -H "user_id: tester1" -H "bypass-cache: false" http://${host}/v1/demo/content-listing

This will return the next 10 entries. 

You can start over the pagination process by providing new pagination configuration (offset and limit queryparams).


# Set up

* The username and password that you use to login to enterprise.apigee.com.
* The name of the organization in which you have an account. Login to 
  enterprise.apigee.com and check account settings.

# Configure 

Update `/setup/setenv.sh` with your environment details

# Import and deploy sample project

To deploy, run `$ sh deploy.sh`

To test, run `$ sh invoke.sh`

# Get help

For assistance, post to the [Apigee Developer Forum](http://support.apigee.com)

Copyright © 2013 Apigee Corporation

Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy
of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
