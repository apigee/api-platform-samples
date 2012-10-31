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

## Example

    curl "http://demo-prod.apigee.net/mobile-friendly-twitter/1/statuses/user_timeline.json?screen_name=Apigee"

    [{"created_at": "Wed Sep 26 20:08:58 +0000 2012",
      "user": {
        "screen_name": "Apigee",
        "name": "Apigee",
        "profile_image_url": "http://a0.twimg.com/profile_images/509323489/apigee_twitter_icon_normal.png"
      },
      "id_str": "251050754373206016",
      "text": "API Platform Update: Trace Tool, Policy to Validate API Keys, Audit Logging, and more http://t.co/ZYBkPDhg"
      },
      ...

## To Deploy

Read the instructions in setup/README.md, or try this command from this directory:

    ../setup/deploy.py -u $USER:$PASS -o $ORG -e test -n mobile-friendly-twitter -d .

