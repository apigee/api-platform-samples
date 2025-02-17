var meterObject = JSON.parse(context.getVariable("calloutResponse.content"));
var readingObject = JSON.parse(context.proxyRequest.content);

if (meterObject.fields && meterObject.fields.readings) {

    // We have a meter object, now add new reading
    var newReading = {
        "mapValue": {
            "fields": {
                "readingId": {
                    "stringValue": readingObject.readingId
                }
            }
        }
    };
    
    if (readingObject.reading) {
        newReading.mapValue.fields["reading"] = {
            "stringValue": readingObject.reading
        }
    }  
    
    if (readingObject.timestamp) {
        var dateobj = new Date(readingObject.timestamp); 
        newReading.mapValue.fields["date"] = {
            "timestampValue": dateobj.toISOString()
        }
    }
    
    if (readingObject.source) {
        newReading.mapValue.fields["source"] = {
            "stringValue": readingObject.source
        }
    }    
    
    if (readingObject.quality) {
        newReading.mapValue.fields["quality"] = {
            "stringValue": readingObject.quality
        }
    }        
    
    if (readingObject.type) {
        newReading.mapValue.fields["type"] = {
            "stringValue": readingObject.type
        }
        
        if (readingObject.type == "error") {
            meterObject.fields["status"] = {
                "stringValue": "error"
            }
        }
        else {
            meterObject.fields["status"] = {
                "stringValue": "normal"
            }            
        }
    }     
    
    if (!meterObject.fields.readings.arrayValue.values)
        meterObject.fields.readings.arrayValue.values = [];
        
    meterObject.fields.readings.arrayValue.values.push(newReading);
}

//context.setVariable("newPayload", JSON.stringify(meterObject));
context.targetRequest.content = JSON.stringify(meterObject);

