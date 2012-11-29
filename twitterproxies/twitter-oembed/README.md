# Twitter Timeline oEmbed

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

This sample transforms a Twitter timeline from JSON to HTML and returns it as
HTML content or as an [oEmbed](http://oembed.com) object that contains the HTML.
If a request to the endpoint is made with an "Accept: application/json" header,
the oEmbed object is returned, or just the HTML otherwise.

A demo application that consumes the API and displays a timeline is included.

## Example

### oEmbed

    curl -H "Accept: application/json" "http://demo-prod.apigee.net/twitter-oembed/1/statuses/user_timeline.json?screen_name=Apigee"

    {"type":"rich",
     "version":"1.0",
     "author_name":"Twitter Timeline oEmbed",
     "author_url":"http://apigee.com",
     "provider_name":"Twitter",
     "provider_url":"http://twitter.com",
     "width":550,
     "height":null,
     "html":"<blockquote class=\"twitter-tweet\"><p>Applying Universal Design Principles to API Initiatives (video &amp; slides from Webcast 9/18 ) <a href=\"http://t.co/jQwtxIaW\">http://t.co/jQwtxIaW</a> thx @<a href=\"http://twitter.com/13protons\">13protons</a> @<a href=\"http://twitter.com/kevinswiber\">kevinswiber</a></p>&mdash; Apigee(@Apigee) <a href=\"https://twitter.com/Apigee/statuses/252831118057934848\" data-datetime=\"2012-10-01T18:03:30Z\">October 1, 2012 6:03:30 PM UTC</a></blockquote>...

### HTML

    curl "http://demo-prod.apigee.net/twitter-oembed/1/statuses/user_timeline.json?screen_name=Apigee"

    <blockquote class="twitter-tweet"><p>Applying Universal Design Principles to API Initiatives (video &amp; slides from Webcast 9/18 ) <a href="http://t.co/jQwtxIaW">http://t.co/jQwtxIaW</a> thx @<a href="http://twitter.com/13protons">13protons</a> @<a href="http://twitter.com/kevinswiber">kevinswiber</a></p>&mdash; Apigee(@Apigee) <a href="https://twitter.com/Apigee/statuses/252831118057934848" data-datetime="2012-10-01T18:03:30Z">October 1, 2012 6:03:30 PM UTC</a></blockquote>...

## To Deploy

Read the instructions in setup/README.md, or try this command from this directory:

    ../setup/deploy.py -u $USER:$PASS -o $ORG -e test -n twitter-oembed -d .

