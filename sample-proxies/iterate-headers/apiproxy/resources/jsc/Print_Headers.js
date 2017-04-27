var response = httpClient.get("http://mocktarget.apigee.net/json");
// set the pending request into a context variable
context.setVariable('pendingResponse', response); 

var headers = "";

var response = context.getVariable('pendingResponse');
if (response) { // retrieve the pending request from the context variable 
    response.waitForComplete();
    if (response.isSuccess()) {
        for (var n in response.getResponse().headers) { 
            headers = headers + n + " --> " + response.getResponse().headers[n] + "\n";
        }
    }
    context.setVariable("response_headers", headers);
}