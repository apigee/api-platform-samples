# Twitter Translate

This sample uses the Twitter Search API to find tweets in a given language and
translate them to the language the query was made in using the
[Microsoft Translator API](http://www.microsofttranslator.com/dev/).

A demo application that performs a search and renders the results in HTML is included.

## Example

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
    ...

# Set up

1. Sign up for [Microsoft Translator API](http://www.microsofttranslator.com/dev/) access,
and replace the `clientId` and `clientSecret` in `apiproxy/resources/jsc/api-config` with your application credentials.

2. Create a cache in the organization and environment you will be deploying the bundle in, using the definition in `twitter-translate-cache.xml`. This is used to cache the Translator API access token across requests. Try the following command:

$ curl -v -X POST -H "Content-Type: application/xml" -d @twitter-translate-cache.xml https://api.enterprise.apigee.com/v1/organizations/$ORG/environments/$ENV/caches -u myname:mypass

* The username and password that you use to login to enterprise.apigee.com.
* The name of the organization in which you have an account. Login to 
 enterprise.apigee.com and check account settings.

# Configure 

Update /setup/setenv.sh with your environment details

# Import and deploy sample project

Run:

/setup/deploy.sh

# Get help

For assistance, post to http://support.apigee.com

Copyright 2013 Apigee Corporation

Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy
of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
