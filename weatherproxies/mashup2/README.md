# Mashup

This sample "mashes up" two web services:

* The Google Geocoding web service
* The Google Elevation web service

It exposes an API that takes two query parameters:

* country: A two-letter country code
* postalcode: A postal code valid in that country

It returns a JSON result that includes the geocoded location for the center
of that postal code, and the elevation at that location.

This sample works exactly like "mashup1," but instead of using six different policies
to call the services and parse the results, it uses a single JavaScript.

For example:

curl "http://ORGANIZATION-test.apigee.net/altitude?country=us&postalcode=08008"

{"country":"us","postalcode":"08008","elevation":{"meters":0.5045232,"feet":1.6552599030345978},
 "location":{"latitude":39.75007129999999,"longitude":-74.1357407}}

