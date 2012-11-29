# Mobile Friendly Twitter

Copyright 2012 Apigee Corporation

Licensed under the Apache License, Version 2.0 (the "License"); you may 
not use this file except in compliance with the License. You may obtain 
a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

-------------------------------

This sample makes Twitter API responses "mobile friendly" by only keeping information
required to create a simple view of a user or public timeline.

A demo application that consumes the API and displays a timeline is included.

## Step 1: Directly invoke the Twitter API.

$ curl "http://api.twitter.com/1/statuses/user_timeline.json?screen_name=Apigee"

To pretty print JSON where python is available:

$ curl "http://api.twitter.com/1/statuses/user_timeline.json?screen_name=Apigee" | python -mjson.tool

Note the structure of each twwet.

## Step 2: Deploy the API proxy

From the directory /twitterproxies, run:

$ ../tools/deploy.py -u myname:mypass -o myorg -e test -n mobile-friendly-twitter -d ./mobile-friendly-twitter

## Step 3: Invoke the mobile-friendly Twitter API

$ curl "http://{myorg}-test.apigee.net/mobile-friendly-twitter/1/statuses/user_timeline.json?screen_name=Apigee"

To pretty print JSON where python is available:

$ curl "http://{myorg}-test.apigee.net/mobile-friendly-twitter/1/statuses/user_timeline.json?screen_name=Apigee" | python -mjson.tool

[
    {
        "created_at": "Wed Nov 28 18:00:29 +0000 2012", 
        "id_str": "273848853919313920", 
        "text": "Understanding your Mobile Customers  - 3 levels of analytics http://t.co/74zIuf8E @karlunho", 
        "user": {
            "name": "Apigee", 
            "profile_image_url": "http://a0.twimg.com/profile_images/509323489/apigee_twitter_icon_normal.png", 
            "screen_name": "Apigee"
        }
    },
    . . .

# Get Help

Post any insights or issues to the Apigee Developer Forum at support.apigee.com.




