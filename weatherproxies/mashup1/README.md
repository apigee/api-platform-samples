# Mashup

This sample "mashes up" two web services:

* The Google Geocoding web service
* The Google Elevation web service

It exposes an API that takes two query parameters:

* country: A two-letter country code
* postalcode: A postal code valid in that country

It returns a JSON result that includes the geocoded location for the center
of that postal code, and the elevation at that location.

It uses a series of policies in order to accomplish this:

1. An AssignMessage policy to generate the request for the geocoding web service
2. A ServiceCallout policy to call it
3. An ExtractVariables policy to parse the response and extract the latitude and longitude
4. An AssignMesage policy to set the parameters for the elevation service
5. An ExtractVariables policy to parse the elevation response
6. A Javascript policy to generate the response JSON from the variables set by the
previous policies.
7. A StatisticsCollector policy to send the values of "country" and "postalcode"
to Analytics for use in a custom report.

## Example

    curl "http://ORGANIZATION-test.apigee.net/altitude?country=us&postalcode=08008"

    {"country":"us","postalcode":"08008",
     "elevation":{"meters":0.5045232,"feet":1.6552599030345978},
     "location":{"latitude":39.75007129999999,"longitude":-74.1357407}}

## To Deploy

Read the instructions in setup/README.md, or try this command from this directory:

    ../setup/deploy.py -u $USER:$PASS -o $ORG -e test -n mashup1 -d .

