// For each city, wait for the HTTP response and extract the 
// RSS XML

var paloAltoRss = getRssXml('paloAlto');
var anchorageRss = getRssXml('anchorage');
var honoluluRss = getRssXml('honolulu');
var newyorkRss = getRssXml('newyork');
var dublinRss = getRssXml('dublin');

// lets pretend we got this response from the target.

response.content=''; 
response.headers['Content-Type']='application/json'; 

// add to the json response using fragments of the 5 rss respones
var json = response.content.asJSON; 

//  convert all 5 RSS responses to JSON and compose

json.paloAlto  = extractTempSunriseSunset(paloAltoRss);
json.anchorage = extractTempSunriseSunset(anchorageRss);
json.honolulu  = extractTempSunriseSunset(honoluluRss);
json.newyork   = extractTempSunriseSunset(newyorkRss);
json.dublin    = extractTempSunriseSunset(dublinRss);

// All Done!

//  =========== functions =========

// Given a name, take the exchange from the session object
// wait for the HTTP response to complete
// check for errors
// check the status code is 200
// return the XML as an XML object.

function getRssXml(name) {
	 var exchange = context.session[name];
	 exchange.waitForComplete();
	 if (exchange.isSuccess()) {
		var resp = exchange.getResponse();
		// check the status code
		if (resp.status==200) {
		  return resp.content.asXML;
		}
		throw "Failed to connect to "+name+". Status code is " + resp.status;
	 }	
	throw "Failed to connect to " + name + ". Error is {" + exchange.getError() + "} ";
}

// Extract values from the XML 
// The format of the RSS is as follows :
//<rss xmlns:yweather='http://xml.weather.yahoo.com/ns/rss/1.0'>
//         <channel>
//		  ...
//		  <item>
//		     <yweather:condition  text='Light Rain' temp='54'   />
//		  </item>
//		  ...
//		  <yweather:astronomy sunrise='6:37 am'   sunset='7:38 pm'/>
//        ...
//        </channel>
//</rss>"
//

function extractTempSunriseSunset(rss) {
	var yweather = new Namespace('http://xml.weather.yahoo.com/ns/rss/1.0');
	var temp =  rss.channel.item.yweather::condition.@temp.toXMLString();
	var sunrise =  rss.channel.yweather::astronomy.@sunrise.toXMLString();
	var sunset =  rss.channel.yweather::astronomy.@sunset.toXMLString();
	var j = { "temp" : temp ,  "sunrise" : sunrise , "sunset" : sunset };
	return j;
}