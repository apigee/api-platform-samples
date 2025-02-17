var res = JSON.parse(context.proxyResponse.content);
var newresult = {};
var singleResult = false;
newresult["meters"] = [];

if (!res.documents) {
    // This means only a single record is being returned, so just put it into an array to simplify processing
    singleResult = true;
    res = {
        "documents": [
            res
        ]
    }
}

for(i=0; i<res.documents.length; i++) {
    var meter = res.documents[i];
    var name = meter.name.split('/').slice(-1)[0];
    print(name);
    var newmeter = {
        "meterId": name,
        "displayName": name,
        "readings": []
    };
    
    if (meter.fields && meter.fields.location && meter.fields.location.geoPointValue) {
        newmeter["location"] = meter.fields.location.geoPointValue.latitude + ", " + meter.fields.location.geoPointValue.longitude;
    }
    
    if (meter.fields && meter.fields.status) {
        newmeter["status"] = meter.fields.status.stringValue;
    }
    
    if (meter.fields && meter.fields.readings && meter.fields.readings.arrayValue && meter.fields.readings.arrayValue.values) {
        for(v=0; v<meter.fields.readings.arrayValue.values.length; v++) {
            var reading = meter.fields.readings.arrayValue.values[v];
            
            var newreading = {
                "meterId": name
            };
            
            if (reading.mapValue.fields.readingId)
                newreading.readingId = reading.mapValue.fields.readingId.stringValue;
            if (reading.mapValue.fields.reading)
                newreading.reading = reading.mapValue.fields.reading.stringValue;
            if (reading.mapValue.fields.quality)
                newreading.quality = reading.mapValue.fields.quality.stringValue;
            if (reading.mapValue.fields.source)
                newreading.source = reading.mapValue.fields.source.stringValue;            
            if (reading.mapValue.fields.date)
                newreading.timestamp = reading.mapValue.fields.date.timestampValue;                 
            if (reading.mapValue.fields.type)
                newreading.type = reading.mapValue.fields.type.stringValue;                 
            if (reading.mapValue.fields.status)
                newreading.status = reading.mapValue.fields.status.stringValue;                 
                        
            newmeter.readings.push(newreading);
        }
    }
    
    newresult["meters"].push(newmeter);
}

if (singleResult) {
    // If this was just a single object, then also return single object
    newresult = newresult["meters"][0];
}

context.proxyResponse.content = JSON.stringify(newresult);
