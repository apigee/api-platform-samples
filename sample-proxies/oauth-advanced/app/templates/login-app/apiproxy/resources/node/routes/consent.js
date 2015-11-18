var https = require('https');
var utils = require('../lib/utils.js');
var config = require('../config/config.js');

exports.get = function(req, res){

	var appName = req.query.app;
	var client_id = req.query.apikey;
	var scope = req.query.scope;
	var state = req.query.state;
	var redirect_uri = req.query.redirect_uri;
	var basePath = utils.getBasePath(req);

	// Build redirect url for consent page
	var consentLink = basePath + '/consent?';
		if (client_id) consentLink += 'apikey='+client_id;
		if (appName) consentLink += '&app='+appName;
		if (state) consentLink += '&state='+state;
		if (scope) consentLink += '&scope='+scope;
		if (redirect_uri) consentLink += '&redirect_uri='+encodeURIComponent(redirect_uri);

	// We want this page loaded every time so the session is checked every load
	res.setHeader('Cache-Control', 'no-cache');
	res.render('consent', {
		basePath: basePath,
		consentLink: consentLink,
		appname: appName,
		scope: scope
	});
};

exports.post = function(req, res){

	var decision = req.body.decision;

	var client_id = req.query.apikey;
	var scope = req.query.scope;
	var state = req.query.state;
	var username = req.query.username;
	var redirect_uri = req.query.redirect_uri;


	// Set the apigee authorization code request payload
	var body = JSON.stringify({
	    'client_id': req.query.apikey,
	    'state': req.query.state,
	    'redirect_uri': req.query.redirect_uri,
	    'scope': req.query.scope,
	    'response_type':'code',
	    'username':req.session.user
	});

	var options = {
		//host: 'wwitman-prod.apigee.net',
                host: config.envInfo.org + "-" + config.envInfo.env + "." + config.envInfo.domain,
		port: 443,
		path: '/oauth2/userAuthorize',
		method: 'POST',
		rejectUnauthorized: false,
		headers: {'Content-Length': body.length, 'Content-Type': 'application/json'}
	};

	if (decision == 'yes') {
		var authCode_req = https.request(options, function(authCode_res) {
			authCode_res.setEncoding('utf8');
        	if (authCode_res.statusCode == 302){
		  	  	// Destroy the session after a successful authorization
        		req.session.destroy();

		  	  	res.statusCode = 302;
	  	  		res.header('Location', authCode_res.headers.location);
				console.log('Redirecting to: ' + authCode_res.headers.location);
	  	  		res.end();
	  	  	}else{
	  	  		//TODO: Render a view so the user can see there was a failure
	  	  		res.statusCode = 500;
				console.log ('Error generating auth code: ' + authCode_res.body);
	  	  		res.end();
	  	  	}

		});

		authCode_req.on('error', function(e) {
			res.write('error outside req:' + e);
			res.end();
		});

		authCode_req.end(body);

	} else {
		console.log('Redirecting to: ' + redirect_uri);
		res.statusCode = 302;
		res.header('Location', redirect_uri + '?consent=no');
		res.end();
	}
};
