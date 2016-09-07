var gulp = require('gulp');
var apigeetool = require('apigeetool')
var gutil = require('gulp-util')

var seedsdk = require('seed-sdk')

var PROXY_NAME = 'helloworld'
var SAMPLE_NAME = 'helloworld'
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
	opts.api = PROXY_NAME
	//product stuff
    opts.proxies = PROXY_NAME
    opts.environments = 'test'

    var sdk = apigeetool.getPromiseSDK()
	return sdk.deployProxy(opts)
		.then(function(){
			  	console.log('success')
			  })
})

gulp.task('clean',function(){
	opts.api = PROXY_NAME
    opts.proxies = PROXY_NAME
    opts.environments = 'test'
    
    var sdk = apigeetool.getPromiseSDK()
    return sdk.undeploy(opts)
              .then(function(){ return sdk.delete(opts)})
                console.log(app)

})