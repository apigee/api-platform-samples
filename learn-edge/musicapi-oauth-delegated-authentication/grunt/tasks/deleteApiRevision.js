/*jslint node: true */

var grunt_common = require('apigee-sdk-mgmt-api');

module.exports = function(grunt) {
	'use strict';
	grunt.registerTask('deleteApiRevision', 'Delete an API revision. e.g. grunt deleteApiRevision:{revision_id}', function(revision) {
		if(grunt.option.flags().indexOf('--keep-last-revision') === -1) { //delete revision when --keep-last-revision flag is not passed
			var deleteRevision = function(error, response, body){
				// if (!error && response.statusCode === 200) {
				// 	//var deletionResult = JSON.parse(body);
				// }
				grunt.log.debug(response.statusCode)
				grunt.log.debug(body);
				done();
			}
			var revisionl = revision || (grunt.option('revisions_undeployed') && grunt.option('revisions_undeployed').revision);
			if(!revisionl) {
				grunt.log.warn('invalid revision. e.g. grunt deleteApiRevision:{revision_id}');
			}else{
				var done = this.async();
				grunt_common.deleteApiRevision(grunt.config.get('apigee_profiles'), revisionl, deleteRevision, grunt.option.flags().indexOf('--curl') !== -1)
			}
		}
		else{
			grunt.log.ok('task skipped. Remove --keep-last-revision flag to delete undeployed revision.')
		}
	});
};
