exports.searchAndReplaceFiles = function(env, grunt){
	var config = {
		test: {
			files: [{
				cwd: 'target/',
				src: ['**/*.js','**/*.xml','!node/node_modules/**/*.js'],
				dest: 'target/',
				expand: true,
			}],
			options: {
				replacements: [
		      ]
		  }
		},
		prod: {
			files: [{
				cwd: 'target/',
				src: ['**/*.js','**/*.xml','!node/node_modules/**/*.js'],
				dest: 'target/',
				expand: true,
			}],
			options: {
				replacements: [
		      ]
		  }
		},
	}
	if(!config[env])grunt.fail.fatal('Environment '+ env +' does not exist under grunt/search-and-replace-files.js')
		return(config[env])
}