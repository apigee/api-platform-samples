/*jslint node: true */

module.exports = function(grunt) {
	'use strict';
	grunt.registerTask('executeTests', 'execute tests when flag --skip-tests is absent.', function() {
		/*eslint if-curly-formatting:0 */
		if(grunt.option.flags().indexOf('--skip-tests') === -1){
			grunt.task.run('mochaTest');
		}
		else{
			grunt.fail.warn('tests skipped. Remove --skip-tests to execute tests.');
		}
	});
};
