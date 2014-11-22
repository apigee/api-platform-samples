var validator = require('validator').Validator;
var https = require('https');
var utils = require('../lib/utils.js');
var config = require('../config/config.js');

exports.get = function(req, res){

	var basePath = utils.getBasePath(req);
	res.render('registration', {
		basePath: basePath
	});
};

exports.post = function(req, res){

	var title = req.body.title;
	var firstname = req.body.forename;
	var lastname = req.body.surname;
	var email = req.body.email;
	var password = req.body.password;
	var verifypassword = req.body.verify;

	// Validate form parameters
	var errors = validateForm(title, firstname, lastname, email, password, verifypassword);
	if (typeof errors !== 'undefined' && errors.length > 0) {
		console.log(errors);
		res.render ('registration',
			{
				result: 'validation_failed',
				errors: errors,
				title: title,
				firstname: firstname,
				lastname: lastname,
				email: email
			});
		return;
	}

	// POST to backend service for registering a user
	var body = JSON.stringify({
	    'username': email,
	    'password': password
	});

	console.log('Registration request: {hidden due to password}');

	// Set the user authentication endpoint information here
	//var authUrl = 'witman-prod.apigee.net';
        var authUrl = config.envInfo.org + "-" + config.envInfo.env + "." + config.envInfo.domain;
	var authPath = '/v1/users';
	var authPort = 443;
	var authMethod = 'POST';

	var options = {
		host: authUrl,
		port: authPort,
		path: authPath,
		method: authMethod,
		headers: { 'Content-Length': body.length, 'Content-Type': 'application/json' }
	};

	var reg_req = https.request(options, function(reg_res) {
		reg_res.setEncoding('utf8');
	  	reg_res.on('data', function (data) {
			console.log('Registration response: ' + reg_res.statusCode + ' ' + data);
	  	  	if (reg_res.statusCode == 201){
	  	  		//collect data from request
	  	  		var client_id = req.query.apikey;
	  	  		var scope  = req.query.scope;
	  	  		var state  = req.query.state;
	  	  		var appName = req.query.app;
				var redirect_uri = req.query.redirect_uri;

	  	  		// Dynamically obtain the host and path for redirection to consent page
				var host = utils.getHost(req);
				var basePath = utils.getBasePath(req);
				var scheme = utils.getUrlScheme(req);

				//TODO: Look at a better way to handle successful registration other
				// than simple redirect to the login page
				var url = basePath + '/login?';
					if (client_id) url += 'apikey='+client_id;
					if (appName) url += '&app='+appName;
					if (state) url += '&state='+state;
					if (scope) url += '&scope='+scope;
					if (redirect_uri) url += '&redirect_uri='+encodeURIComponent(redirect_uri);

				console.log('Redirecting to: ' + url);
	  	  		res.statusCode = 302;
	  	  		res.header('Location', url);
	  	  		res.end();
	  	  	} else {

	  	  		// Parse response data
  	  			var dataObject = JSON.parse(data);

	  	  		if (reg_res.statusCode == 400){
	  	  			var message = dataObject.message;
	  	  		}
	  	  		else{
	  	  			var message = 'Unknown failure.';
	  	  		}

	  	  		res.render('registration', {
	  	  			result: 'reg_failed',
	  	  			message: message

	  	  		});
	  	  	}
	  	});
	});

	reg_req.end(body);
};

validateForm = function (title, firstname, lastname, email, password, verifypassword) {
	var v = new validator();
    var errors = [];
	v.error = function(msg) {
		errors.push(msg);
	};

	// Disabled firstname and lastname verification as they are currently optional
	// v.check(firstname, 'First name is required').len(1, 50);
	// v.check(lastname, 'Last name is required').len(1, 50);

	v.check(email, 'A valid email address is required').isEmail();
	v.check(password, 'Password should be at least 6 characters in length').len(6, 50);
	v.check(password, 'A valid password is required').is(/^[a-zA-Z]+\d+$/);
	v.check(password, 'Password verification failed').equals(verifypassword);

	return errors;
};
