/*jslint node: true */

var grunt_common = require('apigee-sdk-mgmt-api');

module.exports = function(grunt) {
	'use strict';
	grunt.registerTask('installNpmRevision', 'install npm API revision. e.g. grunt installNpmRevision:{revision_id}', function(revision) {
		var installNpmRevision = function(error, response, body) {
			/*eslint no-empty:0 */
			if (!error && response.statusCode === 200) {
				//var undeployResult = JSON.parse(body);
			}
			else{
				done(false)
			}
			grunt.log.debug(response.statusCode)
			grunt.log.debug(body);
			done(error);
		}
		var revisionl = revision || grunt.option('revision');
		//core logic
		if(!revisionl) {
			grunt.fail.fatal('invalid revision id. provide either argument as installNpmRevision:{revision_id}');
		}else{
			var done = this.async();
			grunt_common.npmInstallRevision(grunt.config.get('apigee_profiles'), revisionl, installNpmRevision, grunt.option.flags().indexOf('--curl') !== -1)
		}
	});
};
