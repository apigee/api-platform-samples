exports.generatecURL = function(options){
	//echo curl -H "Authorization:Basic $credentials" "$url/v1/organizations/$org/apis/$application/revisions" -X GET
	var optionsl = JSON.parse(JSON.stringify(options));
	var curl = require('curl-cmd');
	optionsl.auth = optionsl.auth.user + ":" + optionsl.auth.password
	optionsl.hostname = options.uri.replace('https://', '')
	optionsl.path = optionsl.hostname.substring(optionsl.hostname.indexOf('/'));
	optionsl.hostname = optionsl.hostname.replace(optionsl.path, '')
	console.log(curl.cmd(optionsl, {ssl: true, verbose: true}));
}

exports.setNodeResources = function(dir, options, files){
	var fs = require('fs');	
	var task = {};
	if (fs.existsSync('./node')) {
		task.options = options;
		task.files = files
	}
	return task;
}