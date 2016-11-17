var gulp = require('gulp');
var apigeetool = require('apigeetool')
var gutil = require('gulp-util')
var proxy_name = 'response-cache-simple'
gulp.task('default', function() {
  // place code for your default task here
});

var opts = {
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
