var meterObject = JSON.parse(context.proxyRequest.content);
var newMeterObject = {
    "fields": {
        "displayName": {
            "stringValue": meterObject.displayName
        },
        "readings": {
            "arrayValue": {}
        }
    }
}

if (meterObject.location) {
    var geos = meterObject.location.split(',');
    newMeterObject.fields["location"] = {
        "geoPointValue": {
            "latitude": geos[0].trim(),
            "longitude": geos[1].trim()
        }
    }
}

//context.setVariable("newPayload", JSON.stringify(newMeterObject));
context.targetRequest.content = JSON.stringify(newMeterObject);

