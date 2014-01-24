import base64

isError = "false"
client_id = ""
client_secret = ""
access_token = ""

coded_string = flow.getVariable("request.header.Authorization");
if coded_string is not None:
	coded_string_split = coded_string.split(" ")
    # The authorization header must have two arguments, the first of which must be "Bearer" or "Basic".
    # If it's "Basic" we assume that the encoded params are a client ID and secret
    # If it's "Bearer" we assume that the specified param is an access token
	if len(coded_string_split) == 2:
		if coded_string_split[0] == "Basic":
			decoded_string = base64.b64decode(coded_string_split[1])
			decoded_string_split = decoded_string.split(':')
			client_id = decoded_string_split[0]
			client_secret = decoded_string_split[1]
		elif coded_string_split[0] == "Bearer":
#			access_token = "Bearer " + base64.b64decode(coded_string_split[1])
			access_token = "Bearer " + coded_string_split[1]
		else:
			isError = "true"
	else:
		isError = "true"
        
flow.setVariable("auth_header_error", isError);
flow.setVariable("auth_client_id", client_id);
flow.setVariable("auth_client_secret", client_secret);
flow.setVariable("auth_access_token", access_token);
    
