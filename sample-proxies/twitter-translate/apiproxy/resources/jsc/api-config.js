context.setVariable('twitter-translate.translatorApi', {
  // Microsoft Translator API credentials
  // https://datamarket.azure.com/dataset/1899a118-d202-492c-aa16-ba21c33c06cb
  clientId: '<<< YOUR CLIENT ID HERE >>>',
  clientSecret: '<<< YOUR CLIENT SECRET HERE >>>',

  // Authentication
  authUrl: 'https://datamarket.accesscontrol.windows.net/v2/OAuth2-13/',
  scopeUrl: 'http://api.microsofttranslator.com',
  grantType: 'client_credentials',

  basePath: 'http://api.microsofttranslator.com/V2/Http.svc/'
});
