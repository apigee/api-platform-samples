/*jslint node: true */

var grunt_common = require('apigee-sdk-mgmt-api');

module.exports = function(grunt) {
	'use strict';
	grunt.registerTask('deployApiRevision', 'Deploy an API revision. deployApiRevision:{revision_id}', function(revision) {
		var deployedRevision = function(error, response, body) {
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
			grunt.fail.fatal('invalid revision id. provide either argument as deployApiRevision:{revision_id}');
		}else{
			var done = this.async();
			grunt_common.deployApiRevision(grunt.config.get('apigee_profiles'), revisionl, deployedRevision, grunt.option.flags().indexOf('--curl') !== -1)
		}
	});
};
