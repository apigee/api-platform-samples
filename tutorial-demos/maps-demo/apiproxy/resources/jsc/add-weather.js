var res = JSON.parse(context.proxyResponse.content);
var weather = JSON.parse(context.getVariable("ServiceCallout.response"));

if (weather["weather"].length > 0)
    res["weather"] = weather["weather"][0];

if (weather["main"] !== undefined) {
    var newTemp = parseFloat(weather["main"]["temp"]);
    var newTemp = parseFloat(weather["main"]["temp"]) - 273.15;
    res["weather"]["temp"] = newTemp.toFixed(2);
    res["weather"]["temp_units"] = "C";
}

context.proxyResponse.content = JSON.stringify(res);