context.proxyResponse.content=''; 
context.proxyResponse.headers['Content-Type']='application/json'; 
var json = context.proxyResponse.content.asJSON;

json.country = 'us';
json.postalcode = '95123'
json.elevation = 'Very High';