var inputObject = JSON.parse(context.getVariable("firestore.input"));
var keyName = context.getVariable("firestore.key");

var firestoreObject = {
    "fields": {}
}

if (inputObject) {
    for (var key in inputObject) {
      var value = inputObject[key];
      
      if (value && value.includes(", ")) {
        // Is a location
        var geos = value.split(',');
        firestoreObject["fields"][key] = {
            "geoPointValue": {
                "latitude": geos[0].trim(),
                "longitude": geos[1].trim()
            }
        }
      }
      else if (value && !isNaN(Date.parse(value))) {
        var dateobj = new Date(value);
        firestoreObject["fields"][key] = {
            "timestampValue": dateobj.toISOString()  
        };          
      }
      else if (value && (value.toLowerCase() === "true" || value.toLowerCase() === "false")){
        firestoreObject["fields"][key] = {
            "booleanValue": (value.toLowerCase() == "true")  
        };            
      }
      else {
        firestoreObject["fields"][key] = {
            "stringValue": value  
        };          
      }

      if (key == keyName) {
        context.setVariable("firestore.document", value);
      }
    }
}

context.setVariable("firestore.payload", JSON.stringify(firestoreObject));
