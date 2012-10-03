# Twitter Timeline oEmbed

This sample transforms a Twitter timeline from JSON to HTML and returns it as
HTML content or as an [oEmbed](http://oembed.com) object that contains the HTML.
If a request to the endpoint is made with an "Accept: application/json" header,
the oEmbed object is returned, or just the HTML otherwise.

A demo application that consumes the API and displays a timeline is included.

## Example

### oEmbed

    curl -H "Accept: application/json" "http://demo-prod.apigee.net/mobile-friendly-twitter/1/statuses/user_timeline.json?screen_name=Apigee"

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

    curl "http://demo-prod.apigee.net/mobile-friendly-twitter/1/statuses/user_timeline.json?screen_name=Apigee"

    <blockquote class=\"twitter-tweet\"><p>Applying Universal Design Principles to API Initiatives (video &amp; slides from Webcast 9/18 ) <a href=\"http://t.co/jQwtxIaW\">http://t.co/jQwtxIaW</a> thx @<a href=\"http://twitter.com/13protons\">13protons</a> @<a href=\"http://twitter.com/kevinswiber\">kevinswiber</a></p>&mdash; Apigee(@Apigee) <a href=\"https://twitter.com/Apigee/statuses/252831118057934848\" data-datetime=\"2012-10-01T18:03:30Z\">October 1, 2012 6:03:30 PM UTC</a></blockquote>...

## To Deploy

Read the instructions in setup/README.md, or try this command from this directory:

    ../setup/deploy.py -u $USER:$PASS -o $ORG -e test -n twitter-oembed -d .

