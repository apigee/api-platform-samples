// json-patch-duplex.js 0.3
// (c) 2013 Joachim Wester
// MIT license

var exports = {};
(function (jsonpatch) {
    var objOps = {
        add: function (obj, key) {
            obj[key] = this.value;
        },
        remove: function (obj, key) {
            delete obj[key];
        },
        replace: function (obj, key) {
            obj[key] = this.value;
        },
        move: function (obj, key, tree) {
            var temp = {
                op: "_get",
                path: this.from
            };
            apply(tree, [
                temp
            ], undefined);
            apply(tree, [
                {
                    op: "remove",
                    path: this.from
                }
            ], undefined);
            apply(tree, [
                {
                    op: "add",
                    path: this.path,
                    value: temp.value
                }
            ]);
        },
        copy: function (obj, key, tree) {
            var temp = {
                op: "_get",
                path: this.from
            };
            apply(tree, [
                temp
            ], undefined);
            apply(tree, [
                {
                    op: "add",
                    path: this.path,
                    value: temp.value
                }
            ]);
        },
        test: function (obj, key) {
            if(JSON.stringify(obj[key]) != JSON.stringify(this.value)) {
                throw "";
            }
        },
        _get: function (obj, key) {
            this.value = obj[key];
        }
    };
    var arrOps = {
        add: function (arr, i) {
            arr.splice(i, 0, this.value);
        },
        remove: function (arr, i) {
            arr.splice(i, 1);
        },
        replace: function (arr, i) {
            arr[i] = this.value;
        },
        move: objOps.move,
        copy: objOps.copy,
        test: objOps.test,
        _get: objOps._get
    };
    // Dirty check if obj is different from mirror, generate patches and update mirror
    function _generate(mirror, obj, patches, path) {
        var newKeys = Object.keys(obj);
        var oldKeys = Object.keys(mirror);
        var changed = false;
        var deleted = false;
        var added = false;
        for(var t = 0; t < oldKeys.length; t++) {
            var key = oldKeys[t];
            var oldVal = mirror[key];
            if(obj.hasOwnProperty(key)) {
                var newVal = obj[key];
                if(oldVal instanceof Object) {
                    _generate(oldVal, newVal, patches, path + "/" + key);
                } else {
                    if(oldVal != newVal) {
                        changed = true;
                        patches.push({
                            op: "replace",
                            path: path + "/" + key,
                            value: newVal
                        });
                        mirror[key] = newVal;
                    }
                }
            } else {
                patches.push({
                    op: "remove",
                    path: path + "/" + key
                });
                deleted = true// property has been deleted
                ;
            }
        }
        if(!deleted && newKeys.length == oldKeys.length) {
            return;
        }
        for(var t = 0; t < newKeys.length; t++) {
            var key = newKeys[t];
            if(!mirror.hasOwnProperty(key)) {
                patches.push({
                    op: "add",
                    path: path + "/" + key,
                    value: obj[key]
                });
            }
        }
    }
    function diff(before, after) {
        var patches = [];
        _generate(before, after, patches, "");
        return patches;
    }
    jsonpatch.diff = diff;
    /// Apply a json-patch operation on an object tree
    function apply(tree, patches, listen) {
        try  {
            patches.forEach(function (patch) {
                // Find the object
                var keys = patch.path.split('/');
                keys.shift()// Remove empty element
                ;
                var obj = tree;
                var t = 0;
                var len = keys.length;
                while(true) {
                    if(obj instanceof Array) {
                        var index = parseInt(keys[t], 10);
                        t++;
                        if(t >= len) {
                            arrOps[patch.op].call(patch, obj, index, tree)// Apply patch
                            ;
                            break;
                        }
                        obj = obj[index];
                    } else {
                        var key = keys[t];
                        if(key.indexOf('~') != -1) {
                            key = key.replace('~1', '/').replace('~0', '~');
                        }// escape chars
                        
                        t++;
                        if(t >= len) {
                            objOps[patch.op].call(patch, obj, key, tree)// Apply patch
                            ;
                            break;
                        }
                        obj = obj[key];
                    }
                }
            });
        } catch (e) {
            return false;
        }
        return true;
    }
    jsonpatch.apply = apply;
})(exports.jsonpatch || (exports.jsonpatch = {}));
var jsonpatch = exports.jsonpatch;

// Export the jsonpatch library as a context variable to be used in
// JavaScript Steps later in the flow
context.setVariable('lib.json-patch-duplex', jsonpatch);
