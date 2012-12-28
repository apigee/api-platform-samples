# Twitter Translate

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

<<<<<<< HEAD
This sample translates tweets in a Twitter timeline to a single language
(English by default) using the [Microsoft Translator API](http://www.microsofttranslator.com/dev/).

Statuses are filtered by the user's language and translated if it doesn't
match the target language.
=======
This sample uses the Twitter Search API to find tweets in a given language and translate them to the language the query was made in using the [Microsoft Translator API](http://www.microsofttranslator.com/dev/).
>>>>>>> fa05a8c4c41ac88c2df4a6d925f040761618dee0

A demo application that performs a search and renders the results in HTML is included.

## Example

<<<<<<< HEAD
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
=======
    curl "http://demo-prod.apigee.net/twitter-translate/search.json?lang=es&q=bicycle"

    Response excerpt:

    {
    "completed_in": 0.012,
    "max_id": 268099561782931460,
    "max_id_str": "268099561782931457",
    "next_page": "?page=2&max_id=268099561782931457&q=bicicleta&lang=es",
    "page": 1,
    "query": "bicicleta",
    "refresh_url": "?since_id=268099561782931457&q=bicicleta&lang=es",
    "results": [{
        "created_at": "Mon, 12 Nov 2012 21:14:51 +0000",
        "from_user": "Maureira10",
        "from_user_id": 198397428,
        "from_user_id_str": "198397428",
        "from_user_name": "Álvaro Maureira ",
        "geo": null,
        "id": 268099561782931460,
        "id_str": "268099561782931457",
        "iso_language_code": "es",
        "metadata": {
            "result_type": "recent"
        },
        "profile_image_url": "http://a0.twimg.com/profile_images/2632871896/80a1fbf2075c9f0e8630aeb5b8bfcb66_normal.jpeg",
        "profile_image_url_https": "https://si0.twimg.com/profile_images/2632871896/80a1fbf2075c9f0e8630aeb5b8bfcb66_normal.jpeg",
        "source": "&lt;a href=&quot;http://twitter.com/download/iphone&quot;&gt;Twitter for iPhone&lt;/a&gt;",
        "text": "I thought it was not good idea to exit at noon at bicycle to 14. I feel like the balls!",
        "to_user": null,
        "to_user_id": 0,
        "to_user_id_str": "0",
        "to_user_name": null,
        "text_orig": "Creo que NO fue buena idea salir al medio día en bicicleta al 14. Me siento como las pelotas!"
    }, 
>>>>>>> fa05a8c4c41ac88c2df4a6d925f040761618dee0
    ...

## To Deploy

1. Sign up for [Microsoft Translator API](http://www.microsofttranslator.com/dev/) access,
and replace the `clientId` and `clientSecret` in `apiproxy/resources/jsc/api-config` with your application credentials.

2. Create a cache in the organization and environment you will be deploying the bundle in, using the definition in `twitter-translate-cache.xml`. This is used to cache the Translator API access token across requests. Try the following command:

        curl -v -X POST -H "Content-Type: application/xml" -d @twitter-translate-cache.xml https://api.enterprise.apigee.com/v1/organizations/$ORG/environments/$ENV/caches -u $USER:$PASS

<<<<<<< HEAD
$ ../setup/deploy.py -u $USER:$PASS -o $ORG -e test -n twitter-translate -d .


=======
3. Read the instructions in setup/README.md, or try this command from this directory:
>>>>>>> fa05a8c4c41ac88c2df4a6d925f040761618dee0

        ../setup/deploy.py -u $USER:$PASS -o $ORG -e test -n twitter-translate -d .
