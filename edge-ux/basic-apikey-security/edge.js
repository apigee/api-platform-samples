var q = require('q')
var apigeetool = require('apigeetool')
var async = require('async')
var gutil = require('gulp-util')

function createApp(app){
    var defer = q.defer()
    var sdk = apigeetool.getPromiseSDK()
    var opts=baseopts()
    opts.name = app.name
    opts.apiProducts = app.apiProducts
    opts.email = app.email
    opts.callback = app.callback
    
    sdk.createApp(opts)
    .then(function(appresponse){
        defer.resolve(appresponse)
    },function(err){
        defer.reject(err)
    })
    return defer.promise
}

function createApps(app,cb){
    var sdk = apigeetool.getPromiseSDK()
    var opts=baseopts()
    opts.name = app.name
    opts.apiProducts = app.apiProducts
    opts.email = app.email
    opts.callback = app.callback
    cb(null,sdk.createApp(opts))
}

function deleteApps(app,cb){
    var sdk = apigeetool.getPromiseSDK()
    var opts=baseopts()
    opts.name=app.name
    opts.email = app.email
    cb(null,sdk.deleteApp(opts))
}

function deleteProducts(prod,cb) {
    var sdk = apigeetool.getPromiseSDK()
    var opts = baseopts()
    opts.productName = prod.name,
    cb(null,sdk.deleteProduct(opts))
}

function createProducts (prod,cb) {
    var sdk = apigeetool.getPromiseSDK()
   var opts = baseopts()
    prod.productName = prod.name,
        opts.productDesc = prod.displayName
        var proxies = ''
        for(var p in prod.proxies) proxies += prod.proxies[p] +','
        opts.proxies = proxies
        var env = ''
        for(var e in prod.environments) env += prod.environments[e] + ','
        opts.environments = env
        var scopes = ''
        for(var s in prod.scopes) scopes += prod.scopes[s] + ','
        opts.scopes =s 
        opts.productName = prod.name        
        cb(null,sdk.createProduct(opts))
}

function createDevelopers (dev,cb) {
    var sdk = apigeetool.getPromiseSDK()
    var opts = baseopts()
    for(k in dev) opts[k]=dev[k]
    console.log(opts)
    cb(null,sdk.createDeveloper(opts))
}

function deleteDevelopers (dev,cb) {
    var sdk = apigeetool.getPromiseSDK()
    var opts = baseopts()
    opts.email = dev.email
    cb(null,sdk.deleteDeveloper(opts))
}

function deleteApis(it,cb){
    var sdk = apigeetool.getPromiseSDK()
        var opts = baseopts()
        opts.directory = it.dir
        opts.api = it.proxy
        console.log('undeploying ' + opts.api)
        sdk.undeploy(opts)
        .then(function(){
            console.log('undeployed ' + opts.api)
            return sdk.delete(opts)
        },function(err){
            console.log(err)
            return sdk.delete(opts)
        })
        .then(function(){
            console.log('deleted ' + opts.api)
            cb(null, 'done')
        },function(err){
            console.log('delete failed ' + opts.api)
            cb(err)
        })            
}

function deployApis(it,cb) {
    var sdk = apigeetool.getPromiseSDK()
    var opts = baseopts()
    opts.directory = it.dir
    opts.api = it.proxy
    cb(null, sdk.deployProxy(opts))
}

function createCaches(c,cb){
    var sdk = apigeetool.getPromiseSDK()
    var opts = baseopts()
    opts.cache = c.name
    cb(null,sdk.createcache(opts))
}

function deleteCaches(c,cb){
    var sdk = apigeetool.getPromiseSDK()
    var opts = baseopts()
    console.log('deleting cache ' + c.name)
    opts.cache = c.name
    console.log(opts)
    cb(null,sdk.deletecache(opts))    
}

function run(arr, func){ 
    var defer=q.defer();
    async.mapSeries(arr,function(c,cb){
        func(c,cb)
    },function(err,results){
        if(err){
            console.log(err)
            defer.reject(err)
        }
        q.all(results)
            .then(function(){
                console.log('done')
                defer.resolve()
            },function(err){
                console.log(err)
                defer.reject(err)
            })
    })
    return defer.promise
}


function baseopts () {
    var opts = {
        organization: gutil.env.org,
        token: gutil.env.token,
        environments: gutil.env.env,    
        environment: gutil.env.env,
        debug: gutil.env.debug ,
        usergrid_org: gutil.env.ug_org,   
        usergrid_app: gutil.env.ug_app,
        usergrid_client_id: gutil.env.ug_client_id,
        usergrid_secret: gutil.env.ug_secret
    }
    return opts
}

module.exports = {
    run:run,
    createCaches: createCaches,
    deleteCaches: deleteCaches,
    deployApis: deployApis,    
    deleteApis: deleteApis,
    createProducts: createProducts,
    createDevelopers: createDevelopers,
    createApp: createApp,
    createApps: createApps,
    deleteProducts: deleteProducts,
    deleteDevelopers: deleteDevelopers,
    deleteApps: deleteApps

}
