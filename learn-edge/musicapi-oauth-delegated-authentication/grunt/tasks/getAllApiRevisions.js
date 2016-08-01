/*jslint node: true */

var grunt_common = require('apigee-sdk-mgmt-api');

module.exports = function(grunt) {
	'use strict';
	grunt.registerTask('getAllApiRevisions', 'Retrieve all API revisions', function() {
		var apiRevisions = function(error, response, body) {
			grunt.log.writeln(response.statusCode)
			grunt.log.writeln(body);
			done();
		}
		var done = this.async();
		grunt_common.getAllApiRevisions(grunt.config.get('apigee_profiles'), apiRevisions, grunt.option.flags().indexOf('--curl') !== -1)
	});
};
