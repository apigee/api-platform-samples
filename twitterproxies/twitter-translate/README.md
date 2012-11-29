# Twitter Timeline Translate

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

This sample translates tweets in a Twitter timeline to a single language
(English by default) using the [Microsoft Translator API](http://www.microsofttranslator.com/dev/).

Statuses are filtered by the user's language and translated if it doesn't
match the target language.

A demo application that consumes the API and displays a translated public timeline is included.

## Example

$ curl "http://demo-prod.apigee.net/twitter-translate/1/statuses/public_timeline.json"

    [{"id_str":"253222923593216000",
      "retweeted":false,
      "in_reply_to_status_id_str":null,
      "place":null,
      "geo":null,
      "in_reply_to_status_id":null,
      "created_at":"Tue Oct 02 20:00:24 +0000 2012",
      "in_reply_to_user_id_str":null,
      "in_reply_to_screen_name":null,
      "in_reply_to_user_id":null,
      "user":{
        ...
        "lang":"ja",
        ...
      },
      "favorited":false,
      "truncated":false,
      "contributors":null,
      "retweet_count":0,
      "source":"<a href=\"http://twittbot.net/\" rel=\"nofollow\">twittbot.net</a>",
      "id":253222923593216000,
      "coordinates":null,
      "text":"5 Pm! SUNSUN Sun! St. Peter's was コケコッコー!",
      "text_orig":"５時だよ！太陽SUNSUN！！鶏鳴いてコケコッコー！！"
    },
    ...

## To Deploy

Sign up for [Microsoft Translator API](http://www.microsofttranslator.com/dev/) access,
and replace the `clientId` and `clientSecret` in `apiproxy/resources/jsc/timeline-translate`
with your application credentials.

Read the instructions in setup/README.md, or try this command from this directory:

$ ../setup/deploy.py -u $USER:$PASS -o $ORG -e test -n twitter-translate -d .



