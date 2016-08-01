/*jslint node: true */

module.exports = function(grunt) {
	'use strict';
	var previous_force_state = grunt.option("force");
	grunt.registerTask("force", 'Enable --force via its targets "on", "off", "restore"', function(set){
	    if (set === "on") {
	        grunt.option("force",true);
	    }
	    else if (set === "off") {
	        grunt.option("force",false);
	    }
	    else if (set === "restore") {
	        grunt.option("force",previous_force_state);
	    }
	});
}
