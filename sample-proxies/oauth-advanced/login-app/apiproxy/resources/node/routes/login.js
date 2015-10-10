var validator = require('validator').Validator;
var https = require('https');
var utils = require('../lib/utils.js');
var config = require('../config/config.js');
var apigeeLib = require('apigee-access');

exports.get = function(req, res){

	var client_id = req.query.apikey;
	var scope  = req.query.scope;
	var state = req.query.state;
	var redirect_uri = req.query.redirect_uri;
	var appName = req.query.app;

	//obtain information from utils as they are passed in custom headers/logic from apigee proxy
	var basePath = utils.getBasePath(req);

	var regLink  = basePath + '/register?';
		if (client_id) regLink += 'apikey='+client_id;
		if (appName) regLink += '&app='+appName;
		if (state) regLink += '&state='+state;
		if (scope) regLink += '&scope='+scope;
		if (redirect_uri) regLink += '&redirect_uri='+encodeURIComponent(redirect_uri);

	res.render('login', {
		basePath: basePath,
		regLink: regLink
	});
};

exports.post = function(req, res){

	var username = req.body.username;
	var password = req.body.password;

	// Set the user authentication endpoint information here
	//var authUrl = 'wwitman-prod.apigee.net';
        var authUrl = config.envInfo.org + "-" + config.envInfo.env + "." + config.envInfo.domain;
console.log("authUrl: " + authUrl);
	var authPath = '/v1/users/authenticate';
	var authPort = 443;
	var authMethod = 'POST';

	// Set the user authentication payload
	var body = JSON.stringify({
	    'username': username,
	    'password': password
	});

	var options = {
		host: authUrl,
		port: authPort,
		path: authPath,
		method: authMethod,
		rejectUnauthorized: false,
		headers: { 'Content-Length': body.length, 'Content-Type': 'application/json' }
	};

	// Validate form parameters
	var errors = validateLoginForm(username, password);
	if (typeof errors !== 'undefined' && errors.length > 0) {
		console.log(errors);
		res.render ('login',
			{
				result: 'validation_failed',
				errors: errors,
				username: username,
				password: password
			});
		return;
	}

	console.log('Authentication Request: {hidden due to password}');

	var auth_req = https.request(options, function(auth_res) {
		auth_res.setEncoding('utf8');
	  	auth_res.on('data', function (data) {
			console.log('Authentication Response: ' + auth_res.statusCode + ' ' + data);

	  	  	// Collect data from request
	  	  	var client_id = req.query.apikey;
	  	  	var scope  = req.query.scope;
	  	  	var state  = req.query.state;
	  	  	var appName = apigeeLib.getVariable(req, 'verifyapikey.VerifyAPIKey.developer.app.name'); //**CHANGE THIS
			var redirect_uri = req.query.redirect_uri;
			var basePath = utils.getBasePath(req);

	  	  	if (auth_res.statusCode == 200){ //successful login returns 200
				//dynamically obtain the host and path for redirection to consent page
				var host = utils.getHost(req);
				var scheme = utils.getUrlScheme(req);

	  	  		//add response data to headers
  	  			var dataObject = JSON.parse(data);

				//build redirect url for consent page
				//var url = scheme + '://' + host + basePath + '/consent?';
				var url = basePath + '/consent?';
					if (client_id) url += 'apikey='+client_id;
					if (appName) url += '&app='+appName;
					if (state) url += '&state='+state;
					if (scope) url += '&scope='+scope;
					if (redirect_uri) url += '&redirect_uri='+encodeURIComponent(redirect_uri);


  	  			// If 'success' property value is false, then authentication failed.
  	  			if (!dataObject.status) {
		  	  		res.render('login', { status:'auth_failed_unknown_reason'});
  	  			} else {

  	  				// Store the username in the session for later use
  	  				req.session.user = username;
/*					res.statusCode = 302;
					res.header('Location', url);*/

					/* with redirection
					res.statusCode = 302;
					res.header('Location', url);*/

					//with no redirection
		  	  		res.render('consent', {
						basePath: basePath,
						consentLink: url,
						appname: appName,
						scope: scope
	  	  		 	});

					console.log ('Redirecting to: ' + url);

  	  			}
	  	  		res.end();

	  	  	} else { //unsuccessful login returns 403 status code
	  	  		console.log('Auth Response: ' + auth_res.statusCode + ' ' + data);
	  	  		var regLink  = basePath + '/register?';

				  if (client_id) regLink += 'apikey='+client_id;
				  if (appName) regLink += '&app='+appName;
				  if (state) regLink += '&state='+state;
				  if (scope) regLink += '&scope='+scope;
				  if (redirect_uri) regLink += '&redirect_uri='+encodeURIComponent(redirect_uri);

	  	  		res.render('login', {
	  	  			result: 'auth_failed',
	  	  			basePath: basePath,
	  	  			regLink: regLink

	  	  		 });
	  	  	}
	  	});
	});

	auth_req.on('error', function(e) {
		res.write('error outside req:' + e);
		res.end();
	});

	auth_req.end(body);
};

validateLoginForm = function (username, password) {
	var v = new validator();
    var errors = [];
	v.error = function(msg) { errors.push(msg); };
	v.check(username, 'A valid email address is required').len(1, 50);
	v.check(password, 'Password is required').len(1, 50);
	return errors;
};
