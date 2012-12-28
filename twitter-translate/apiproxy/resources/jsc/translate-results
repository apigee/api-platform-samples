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
 * Translate the text to the targetLanguage
 */
function translate(apiAccessToken, targetLanguage, text) {
  var headers = {
      'Authorization': 'Bearer ' + apiAccessToken
    },
    queryObj = {
      'text': text,
      'to': targetLanguage
    };

  var req = new Request(translatorApi.basePath + 'Translate?' + serializeQuery(queryObj), 'GET', headers);
  var exchange = httpClient.send(req);

  // Wait for the asynchronous GET request to finish
  exchange.waitForComplete();

  if (exchange.isSuccess()) {
    var responseObj = exchange.getResponse().content.asXML;

    return responseObj.toString();
  } else if (exchange.isError()) {
    throw new Error(exchange.getError());
  }
}

var targetLanguage = context.getVariable('twitter-translate.targetLanguage'),
  apiAccessToken = context.getVariable('twitter-translate.apiAccessToken');

var q = context.getVariable('request.queryparam.q'),
  lang = context.getVariable('request.queryparam.lang');

// Get the original JSON response as an object
var origResponse = response.content.asJSON;

if (origResponse === Object(origResponse) &&
    Array.isArray(origResponse.results)) {
  var responseObj = origResponse,
    results = origResponse['results'],
    status;

  // Translate each status to the target language
  for (var i = 0, len = results.length; i < len; ++i) {
    status = results[i];

    // Save the original text and update with a translated version
    status.text_orig = status.text;
    status.text = translate(apiAccessToken, targetLanguage, status.text);
  }

  // Send the results back as JSON
  response.content = JSON.stringify(responseObj);
}
