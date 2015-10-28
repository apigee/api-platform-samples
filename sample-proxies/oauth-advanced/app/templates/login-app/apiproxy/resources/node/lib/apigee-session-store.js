var apigeeAccess = require('apigee-access');

module.exports = function(session){

    // Initilize express's Store
    var Store = session.Store;

    console.log('initilizating session store...');
    function ApigeeStore(options){

        var self = this;
        options = options || {};
        Store.call(this, options);
        // Force the scope to be application to allow more flexibility
        options.resource ='sessionCache';
        options.scope = 'application';
        console.log('getting a cache resource..');
        self.cache = apigeeAccess.getCache(options);

        self.on('error', function () { self.emit('disconnect'); });
        self.on('connect', function () { self.emit('connect'); });
    };

    // Let's extend the Store prototype
    ApigeeStore.prototype.__proto__ = Store.prototype;


    ApigeeStore.prototype.get = function(sid,fn){
        console.log('attempting cache get for %s', sid);
        this.cache.get(sid.toString(), function(err,data){
            if(err) {console.log('error getting cache'); return fn(err);}
            if (!data) return fn();
            var result;
            data = data.toString();
            try {
                result = JSON.parse(data);
            }catch (err) {
                return fn(err);
            }
            console.log('Got %s', data.toString());
            return fn(null, result);

        });
    };

    ApigeeStore.prototype.set = function(sid, sess, fn){
        try{
            console.log('attempting cache put for %s', sid);
            sess = JSON.stringify(sess);
            this.cache.put(sid.toString(), sess, function(err){
                err || console.log('Put %s', sess);
                fn && fn.apply(this, arguments);
            });
        } catch(err){
            console.log('error while trying to put cache: '+err);
            fn && fn(err);
        }
    };

    ApigeeStore.prototype.destroy = function(sid, fn){
        console.log('attempting cache invalidate...');
        this.cache.remove(sid.toString(), function(err){
            err || console.log('Removed %s', sid.toString());
        });
    };

    return ApigeeStore;
};
