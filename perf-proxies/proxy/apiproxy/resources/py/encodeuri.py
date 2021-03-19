import base64

uri = request.getVariable('uri')
encoded = base64.encodestring(uri)
request.setVariable('EncodedURI', encoded)
