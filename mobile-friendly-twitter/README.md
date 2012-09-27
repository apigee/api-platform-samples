# Mobile Friendly Twitter

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

