var express = require('express');
var usergrid = require('usergrid');
var config = require('./config');

// Set up Express environment and enable it to read and write JavaScript
var app = express();
app.use(express.bodyParser());

// Initialize Usergrid

var client = new usergrid.client({
      orgName      : config.organization,
      appName      : config.application,
      clientId     : config.clientId,
      clientSecret : config.clientSecret,
      authType     : usergrid.AUTH_CLIENT_ID,
      URI          : config.URI || 'https://apibaas-trial.apigee.net',
      logging      : config.logging
});


// The API starts here

// GET /

var rootTemplate = {
        'employees' : {
                'href' : '/profiles'
        }
};

app.get('/', function(req, resp) {
        resp.jsonp(rootTemplate);
});

// GET /profiles

app.get('/profiles', function(req, res) {
                getProfiles(req, res);
});

function getProfiles(req, res) {
        client.createCollection({
                type : 'employees'
        }, function(err, employees) {
                if (err) {
                        res.jsonp(500, {
                                'error' : JSON.stringify(err)
                        });
                        return;
                }

                var emps = [];
                while (employees.hasNextEntity()) {
                        var emp = employees.getNextEntity().get();
                        var e = {
                                'id' : emp.id,
                                'firstName' : emp.firstName,
                                'lastName' : emp.lastName,
                                'phone' : emp.phone
                        };
                        emps.push(e);
                }
                res.jsonp(emps);
        });
}

// POST /profiles

app.post('/profiles', function(req, res) {
        if (!req.is('json')) {
                res.jsonp(400, {
                        error : 'Bad request'
                });
                return;
        }

        var b = req.body;
        var e = {
                'id' : b.id,
                'firstName' : b.firstName,
                'lastName' : b.lastName,
                'phone' : b.phone
        };

        if ((e.id === undefined) || (e.firstName === undefined)
                        || (e.lastName === undefined) || (e.phone === undefined)) {
                res.jsonp(400, {
                        error : 'Bad request'
                });
                return;
        }

        createProfile(e, req, res);
});

function createProfile(e, req, res) {
        var opts = {
                type : 'employees',
                name : e.id
        };

        client.createEntity(opts, function(err, o) {
                if (err) {
                        res.jsonp(500, err);
                        return;
                }
                o.set(e);
                o.save(function(err) {
                        if (err) {
                                res.jsonp(500, err);
                                return;
                        }
                        res.send(201);
                });
        });
}


// Listen for requests until the server is stopped

var port = process.env.PORT || 9000;
app.listen(port, function(){
  console.log('The server is listening on port %d', port);
});
