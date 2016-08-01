/*jslint node: true */

var grunt_common = require('apigee-sdk-mgmt-api');

module.exports = function(grunt) {
	'use strict';
	grunt.registerTask('undeployApiRevision', 'Undeploy an API revision. e.g. grunt undeployApiRevision:{revision_id}', function(revision) {
		var undeployedRevision = function(error, response, body) {
			/*eslint if-curly-formatting:0 */
			if (!error && response.statusCode === 200){
				var undeployResult = JSON.parse(body);
				grunt.option('revisions_undeployed', undeployResult)
			}
			grunt.log.debug(response.statusCode)
			grunt.log.debug(body);
			done();
		}
		var revisionl = revision || (grunt.option('revisions_deployed') && grunt.option('revisions_deployed').revision && grunt.option('revisions_deployed').revision[0].name);
		//revisions_deployed are only set when grunt is run in sequence, otherwise it'll be null
		if(!revisionl) {
			grunt.log.warn('Invalid revision id. e.g. grunt undeployApiRevision:{revision_id}');
		}else{
			var done = this.async();
    		grunt_common.undeployApiRevision(grunt.config.get('apigee_profiles'), revisionl, undeployedRevision, grunt.option.flags().indexOf('--curl') !== -1); //send cURL switch to log curl commands
		}
	});
};
