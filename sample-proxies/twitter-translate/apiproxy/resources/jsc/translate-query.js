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
 * Detect the language of the text
 * http://msdn.microsoft.com/en-us/library/ff512411.aspx
 */
function detect(apiAccessToken, text) {
  var headers = {
      'Authorization': 'Bearer ' + apiAccessToken
    },
    queryObj = {
      'text': text
    };

  var req = new Request(translatorApi.basePath + 'Detect?' + serializeQuery(queryObj), 'GET', headers);
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

/**
 * Translate the text to the targetLanguage
 * http://msdn.microsoft.com/en-us/library/ff512421.aspx
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

var q = context.getVariable('request.queryparam.q'),
  lang = context.getVariable('request.queryparam.lang');

if (q && lang) {
  // Retrieve the access token for the Translator API
  var apiAccessToken = context.getVariable('twitter-translate.apiAccessToken');

  // Detect the language the query was made in -- search results will be translated
  // from the language `lang` to this language.
  var queryOrigLang = detect(apiAccessToken, q);
  context.setVariable('twitter-translate.targetLanguage', queryOrigLang);

  // Translate the query to the language `lang` we are searching in
  var translatedQuery = translate(apiAccessToken, lang, q);

  // Replace the Search API query parameter with the new translated query
  context.setVariable('request.queryparam.q', translatedQuery);
}
