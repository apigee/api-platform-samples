# Javascript Mashup

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

## Example

    curl "http://ORGANIZATION-test.apigee.net/altitude?country=us&postalcode=08008"

    {"country":"us","postalcode":"08008",
     "elevation":{"meters":0.5045232,"feet":1.6552599030345978},
     "location":{"latitude":39.75007129999999,"longitude":-74.1357407}}

## To Deploy

Read the instructions in setup/README.md, or try this command from this directory:

    ../setup/deploy.py -u $USER:$PASS -o $ORG -e test -n mashup1 -d .

