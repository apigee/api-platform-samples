var res = JSON.parse(context.proxyResponse.content);
var newresult = {};
var singleResult = false;
newresult["readings"] = [];

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
                
            newresult.readings.push(newreading);
        }
    }
}

context.proxyResponse.content = JSON.stringify(newresult);
