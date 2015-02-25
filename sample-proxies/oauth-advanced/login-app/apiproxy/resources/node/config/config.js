
'use strict';

/*
## Cloud users: Leave the default value for $api_domain.
## On-prem customers: 
## - Change the $url to your Apigee management server.
## - Change $domain to the base domain for your own Apigee API calls.
*/

exports.envInfo = {
  org: 'Enter your org name',
  env: 'Enter your environment',
  domain: 'apigee.net',
  appKey: 'Enter the client ID from login-app',
  appSecret: 'Enter the client secret from login-app'
};
