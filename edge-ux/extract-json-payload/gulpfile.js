var gulp = require('gulp');
var apigeetool = require('apigeetool')
var gutil = require('gulp-util')
var proxy_name = 'extract-json-payload'
gulp.task('default', function() {
  // place code for your default task here
});

var opts = {
    // baseuri: 'https://api.e2e.apigee.net',
    organization: gutil.env.org,
    token: gutil.env.token,
    environments: gutil.env.env,    
    environment: gutil.env.env,
    debug: gutil.env.debug 
}

gulp.task('deploy',function(){
	opts.api = proxy_name
	return apigeetool.getPromiseSDK()
		.deployProxy(opts)
})
