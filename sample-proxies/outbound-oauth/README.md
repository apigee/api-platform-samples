# Outbound OAuth

This sample demonstrates how to make advanced callouts from API 
proxies to backend services secured using OAuth.

Specifically, the API Proxy uses JavaScript to obtain an access 
token using the 'client credentials' grant type. To obtain an access 
token, the API proxy presents an API key and secret to the Azure 
translator service. In exchange, the Azure service returns an access token 
that can be used for multiple requests.

The API proxy uses API Services Cache resource to store access 
tokens in memory.  (Otherwise, the API proxy would be required to obtain 
an access token for each call, resulting in significant overhead and probable 
performance degradation.)

You can use this sample as template for API proxies that must present tokens (whether 
API keys or access tokens) to access backend services.

This sample uses the Twitter Search API to find tweets in a given language and
translate them to the language the query was made in using the
[Microsoft Translator API](http://www.microsofttranslator.com/dev/).

A demo application that performs a search and renders the results in HTML is included.

## Example

    curl -v "http://demo-prod.apigee.net/outbound-oauth/search.json?lang=es&q=bicycle"

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
and replace the `clientId` and `clientSecret` in `apiproxy/resources/jsc/api-config.js` with your application credentials.

2. Create a cache in the organization and environment you will be deploying the bundle in, using the definition in `oauth-token-cache.xml`. This is used to cache the Translator API access token across requests. Try the following command:

    ```curl -v -X POST -H "Content-Type: application/xml" -d @oauth-token-cache.xml https://api.enterprise.apigee.com/v1/organizations/$ORG/environments/$ENV/caches -u myname:mypass```

* The username and password that you use to login to enterprise.apigee.com.
* The name of the organization in which you have an account. Log in to 
 [enterprise.apigee.com](http://enterprise.apigee.com) and check account settings.

# Configure 

Update `/setup/setenv.sh` with your environment details

# Import and deploy sample project

Run `/setup/deploy.sh`

# Get help

For assistance, please use [Apigee Support](https://community.apigee.com/content/apigee-customer-support).

Copyright © 2014, 2015 Apigee Corporation

Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy
of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
