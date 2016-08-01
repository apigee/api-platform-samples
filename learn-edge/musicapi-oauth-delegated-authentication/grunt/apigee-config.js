exports.profiles = function(grunt){
	return	{
			env : grunt.option('env'),     // replace with environment
			'test' : {
				apiproxy : 'musicapi-oauth-delegated-authentication',
					org : 'testmyapi', // replace with organization
					env : 'test',     // replace with environment
					url_mgmt : 'https://api.enterprise.apigee.com',  // for cloud environments, leave as is
					username : grunt.option('username'), //|| process.env.ae_username, // pass credentials as arguments as grunt task --username=$ae_username --password=$ae_password
					password : grunt.option('password'), //|| process.env.ae_password, // use ae_username and ae_password are defined as environment variables and no arguments are passed
					revision : grunt.option('revision'), // provide revision to be undeployed by passing argument as --revision=X
					override : grunt.option('override') || false,
					delay : grunt.option('delay') || 0
				},
				'prod' : {
					apiproxy : 'musicapi-oauth-delegated-authentication',
					org : 'testmyapi', // replace with organization
					env : 'prod',     // replace with environment
					url_mgmt : 'https://api.enterprise.apigee.com',  // for cloud environments, leave as is
					username : grunt.option('username'), //|| process.env.ae_username, // pass credentials as arguments as grunt task --username=$ae_username --password=$ae_password
					password : grunt.option('password'), //|| process.env.ae_password, // use ae_username and ae_password are defined as environment variables and no arguments are passed
					revision : grunt.option('revision'), // provide revision to be undeployed by passing argument as --revision=X
					override : grunt.option('override') || false,
					delay : grunt.option('delay') || 0
				}
			}
}

exports.xmlconfig = function(env, grunt){
	config = { "test" : [
		{//sets description within API proxy for tracking purposes with this format 'git commit: 8974b5a by dzuluaga on Diegos-MacBook-Pro-2.local'
		 //see grunt/tasks/saveGitRevision.js for further customization
			"options": {
				"xpath": "//APIProxy/Description",
				"value": "<%= grunt.option('gitRevision') %>"
			},
			"files": {
				"target/apiproxy/<%= apigee_profiles[grunt.option('env')].apiproxy %>.xml": "apiproxy/*.xml"
			}
		}
		],
	 "prod" : [
		{//sets description within API proxy for tracking purposes with this format 'git commit: 8974b5a by dzuluaga on Diegos-MacBook-Pro-2.local'
		 //see grunt/tasks/saveGitRevision.js for further customization
			"options": {
				"xpath": "//APIProxy/Description",
				"value": "<%= grunt.option('gitRevision') %>"
			},
			"files": {
				"target/apiproxy/<%= apigee_profiles[grunt.option('env')].apiproxy %>.xml": "apiproxy/*.xml"
			}
		}
		]}
		if(!config[env])grunt.fail.fatal('Environment '+ env +' does not exist under grunt/apigee-config.js')
		return config[env];
}