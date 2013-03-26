var jsonpatch = context.getVariable('lib.json-patch-duplex');

var originalJSON = context.getVariable('json-patch.originalJSON');
var patches = JSON.parse(request.body);

// Only apply the patch to the "data" property of a single entity
if (originalJSON != null &&
    Array.isArray(originalJSON.entities) &&
    originalJSON.entities.length == 1 &&
    typeof originalJSON.entities[0].data !== 'undefined') {

  var data = originalJSON.entities[0].data;
  var patchSuccessful = jsonpatch.apply(data, patches);

  if (patchSuccessful) {
    // Change the request to store the modified entity data
    // instead of passing the JSON Patch data on to App Services
    request.body = JSON.stringify({ data: data });
    request.method = 'PUT';
  }
}
