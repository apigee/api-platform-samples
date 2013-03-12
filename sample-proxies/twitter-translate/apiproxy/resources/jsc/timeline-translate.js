/* This JavaScript resource filters the timeline response (e.g. from
 * statuses/public_timeline.json) by user language and translates their
 * statuses to English using the Microsoft Translator API */

// Microsoft Translator API credentials
// https://datamarket.azure.com/dataset/1899a118-d202-492c-aa16-ba21c33c06cb
var translatorApi = {
  clientId: '<<< YOUR CLIENT ID HERE >>>',
  clientSecret: '<<< YOUR CLIENT SECRET HERE >>>',

  authUrl: 'https://datamarket.accesscontrol.windows.net/v2/OAuth2-13/',
  scopeUrl: 'http://api.microsofttranslator.com',
  grantType: 'client_credentials',

  translateUrl: 'http://api.microsofttranslator.com/V2/Http.svc/Translate'
};

function serializeQuery(obj) {
  var str = [];
  for (var p in obj) {
    str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
  }
  return str.join("&");
}

// Retrieve an access token from the Microsoft Translator API
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

function translate(accessToken, targetLanguage, text) {
  var headers = {
      'Authorization': 'Bearer ' + accessToken
    },
    queryObj = {
      'text': text,
      'to': targetLanguage
    };

  var req = new Request(translatorApi.translateUrl + '?' + serializeQuery(queryObj), 'GET', headers);
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

// Target translation language
var targetLanguage = 'en';

// Get the original JSON response as an object
var origResponse = response.content.asJSON;

// Retrieve an access token for the Translator API
var accessToken = getAccessToken();

// Only transform the response if it is an array of statuses
// (it's probably an error or fault response otherwise)
if (Array.isArray(origResponse)) {
  var responseObj = origResponse,
    status;

 // Translate statuses if the user's language is not the target language
  for (var i = 0, len = responseObj.length; i < len; ++i) {
    status = responseObj[i];

    if (status.user.lang !== targetLanguage) {
      // Save the original text and update with a translated version
      status.text_orig = status.text;
      status.text = translate(accessToken, targetLanguage, status.text);
    }
  }

// Send the timeline back as JSON
  response.content = JSON.stringify(responseObj);
}
