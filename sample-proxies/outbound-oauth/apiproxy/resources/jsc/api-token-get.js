var translatorApi = context.getVariable('twitter-translate.translatorApi');

/**
 * Serialize an object to a query parameter string
 * e.g. { a: 'b', c: 'd' } --> 'a=b&c=d'
 */
function serializeQuery(obj) {
  var str = [];
  for (var p in obj) {
    str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
  }
  return str.join("&");
}

/**
 * Retrieve an access token for the Microsoft Translator API
 * http://msdn.microsoft.com/en-us/library/hh454950.aspx
 */
function getAccessToken() {
  var bodyObj = {
    'grant_type': translatorApi.grantType,
    'scope': translatorApi.scopeUrl,
    'client_id': translatorApi.clientId,
    'client_secret': translatorApi.clientSecret
  };

  var req = new Request(translatorApi.authUrl, 'POST', {}, serializeQuery(bodyObj));
  var exchange = httpClient.send(req);

  // Wait for the asynchronous POST request to finish
  exchange.waitForComplete();

  if (exchange.isSuccess()) {
    var responseObj = exchange.getResponse().content.asJSON;

    if (responseObj.error) {
      throw new Error(responseObj.error_description);
    }

    return responseObj.access_token;
  } else if (exchange.isError()) {
    throw new Error(exchange.getError());
  }
}

context.setVariable('twitter-translate.apiAccessToken', getAccessToken());
