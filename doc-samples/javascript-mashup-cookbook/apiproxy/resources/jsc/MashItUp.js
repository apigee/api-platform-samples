//This JavaScript implements the httpClient intefrace defined by Apigee's
// JavaScript Object Model. Complete documentation is available at:
// http://apigee.com/docs/api-platform/content/javascript-object-model

// Initialize the response that might already be hanging around
response.content = '';
response.headers['Content-Type'] = 'application/json';
//Catch errors if the necessary parameters are not on the request message
try {
   if ((request.queryParams.postalcode == undefined) ||
       (request.queryParams.country == undefined)) {
     throw '"postalcode" and "country" query parameters are required';
   }

   // Send an HTTP GET to the URL that we construct
   var geocoding = httpClient.get(
        'http://maps.googleapis.com/maps/api/geocode/json?address=' +
        request.queryParams.postalcode +
        '&region=' + request.queryParams.country +
        '&sensor=false');
    geocoding.waitForComplete();
    if (!geocoding.isSuccess()) {
	throw 'Error contacting geocoding web service';
    }
    // We got a response. Parse the JSON into a JavaScript object.
    geocodeResponse = geocoding.getResponse().content.asJSON;
    if (geocodeResponse.status != 'OK') {
	throw 'Error returned from geocoding web service: ' + geocodeResponse.status;
    }

    // Go through the JavaScript returned by Google and get the results
    var lat = geocodeResponse.results[0].geometry.location.lat;
    var lng = geocodeResponse.results[0].geometry.location.lng;

    // Send another HTTP GET to the other service
    var altitude = httpClient.get(
        'http://maps.googleapis.com/maps/api/elevation/json?sensor=false&locations=' +
            lat + ',' + lng);
    altitude.waitForComplete();
    if (!altitude.isSuccess()) {
	throw 'Error contacting altitude web service';
    }
    altitudeResponse = altitude.getResponse().content.asJSON;
    if (altitudeResponse.status != 'OK') {
	throw 'Error returned from altitude web service: ' + altitudeResponse.status;
    }

    var alt = altitudeResponse.results[0].elevation;
    
    // Assemble the parts of the response as a JavaScript object
    var location = new Object();
    location.latitude = lat;
    location.longitude = lng;

    var altitude = new Object();
    altitude.meters = alt;
    altitude.feet = alt * 3.2808399;

    // Final assembly, then turn it into a JSON object
    var body = response.content.asJSON;
    body.country = request.queryParams.country;
    body.postalcode = request.queryParams.postalcode;
    body.elevation = location;
    body.altitude = altitude;

} catch (err) {
    // Handle any error that may have happened previously by generating a response
    response.content.asJSON.error = err;
}