// Look at the variables that were set in ParseElevationResponse
var elevationMeters = context.getVariable('elevationresponse.elevation');
var elevationFeet = elevationMeters * 3.2808399;

// Re-initialize the response. This variable currently holds the response from the
// elevation service, which is in XML
response.content = '';
response.headers['Content-Type'] = 'application/json';

// Create a brand-new JSON object for the response and fill it up
var r = response.content.asJSON;
r.country = context.getVariable('Country');
r.postalcode = context.getVariable('PostalCode');

var el = new Object();
el.meters = elevationMeters;
el.feet = elevationFeet;
r.elevation = el;

var loc = new Object();
loc.latitude = context.getVariable('geocoderesponse.latitude');
loc.longitude = context.getVariable('geocoderesponse.longitude');
r.location = loc;


