var firestoreResponse = context.getVariable("serviceResponse.content");
var keyName = context.getVariable("firestore.key");
var tableName = context.getVariable("firestore.collection");

var singleResponse = false;

var responseObject = {};
responseObject[tableName] = [];

if(firestoreResponse) {
    
    var inputObject = JSON.parse(firestoreResponse);
    
    if (!inputObject.documents) {
        singleResponse = true;
        // This means only a single record is being returned, so just put it into an array to simplify processing
        inputObject = {
            "documents": [
                inputObject
            ]
        }
    }    

    for(i=0; i<inputObject.documents.length; i++) {
        var record = inputObject.documents[i];
        if (record.name) {
            var name = record.name.split('/').slice(-1)[0];
            var newRecord = {};
            newRecord[keyName] = name;
            
            if (record.fields) {
                for (var key in record.fields) {
                  var value = record.fields[key];
                  var newValue = getValue(value);
                  
                  if (!(newValue === undefined))
                      newRecord[key] = newValue;
                // TODO - find solution for maps and arrays
                //else {
                //      if (value && value.mapValue && value.mapValue.fields) {
                //        for (var mapKey in value.mapValue.fields) {
                //            var mapValue = value.mapValue.fields[mapKey];
                //            newRecord[key + "." + mapKey] = getValue(mapValue);
                //        }
                //      }                      
                //  }
                }
                
                responseObject[tableName].push(newRecord);
            }
        }
    }
}

if (singleResponse) {
    responseObject = responseObject[tableName][0];
}

context.setVariable("firestore.response", JSON.stringify(responseObject));

function getValue(node) {
    var result;
    
    if (node && node.stringValue)
        result = node.stringValue;
    else if (node && node.hasOwnProperty("booleanValue"))
        result = node.booleanValue;
    else if (node && node.geoPointValue)
        result = node.geoPointValue.latitude + ", " + node.geoPointValue.longitude;
    else if (node && node.timestampValue)
        result = node.timestampValue;
        
    return result;
}

