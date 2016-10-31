var gulp = require('gulp');
var apigeetool = require('apigeetool')
var gutil = require('gulp-util')
var proxy_name = 'basic-apikey-security'
var edge = require('./edge.js')
gulp.task('default', function () {
    // place code for your default task here
});

var apilist =[ {
    dir: './', proxy: 'basic-apikey-security'
}]

var apiProducts =[ {
    "approvalType": "auto", "displayName": "Learn Edge Product", "name": "LearnEdgeProduct", "environments":[ "test", "prod"], "proxies":[ "basic-apikey-security"]
}]

var developers =[ {
    "email": "learn-edge-developer@example.com", "firstName": "Learn", "lastName": "Edge", "userName": "learner"
}]

var apps =[ {
    name: "learn-edge-app", email: 'learn-edge-developer@example.com', apiProducts: 'LearnEdgeProduct'
}]

gulp.task('deploy',[], function () {
    return edge.run(apilist, edge.deployApis).then (function () {
        console.log('API creation failed, continue');
        return edge.run(apilist, edge.deployApis)
    }).then(function () {
        return edge.run(developers, edge.createDevelopers)
    },
    function () {
        console.log('API deploy failed');
        return edge.run(developers, edge.createDevelopers)
    }).then(function () {
        return edge.run(apiProducts, edge.createProducts)
    },
    function () {
        console.log('Developer might already exist');
        return edge.run(apiProducts, edge.createProducts)
    }).then(function () {
        return edge.run(apps, edge.createApps)
    }).then(function () {
        console.log('all done')
    },
    function (err) {
        console.log(err)
    })
})

