var express = require('express');

// These modules used for distributed session handling in Apigee Edge
var session = require('express-session');
var ApigeeStore = require('./lib/apigee-session-store.js')(session);
var cookieParser = require('cookie-parser');

// Additional modules to support the app
var engine = require('ejs-locals');
var favicon = require('serve-favicon');
var bodyParser = require('body-parser');
var utils = require('./lib/utils.js');
var apigee = require('apigee-access');

var app = express();
app.set('port', process.env.PORT || 3000); // When running local, app will listen on port 3000

// Apigee Edge is a proxy so lets trust the x-forwarded-* headers set in the API Proxy
app.set('trust proxy', 1);

/* Use the below middleware to handle requests for the favicon
 app.use(favicon(__dirname + '/public/favicon.ico'));
*/

// Serve up the CSS and static files before sessions are managed.
var path = require('path');
app.use(require('less-middleware')({ src: __dirname + '/public' }));
app.use(express.static(path.join(__dirname, 'public')));

// Define the options used for the user sessions/Cookie
var sessionOptions = {
  name: 'sid',
  secret: 'apigee123',
  cookie: {
    path:'/',
    maxAge: 1800000,
    secure: false,
    httpOnly: true
  },
  proxy:true,
  saveUninitialized: true,
  resave: true,
};

// Support using ApigeeStore if deployed in Apigee Edge, else express-session
// will use MemoryStore
if (apigee.getMode() === 'apigee'){
  sessionOptions.secure = true;
  sessionOptions.store = new ApigeeStore({defaultTtl:'1900'}); // ttl in seconds
}

// Handle sessions for all requests.
app.use(cookieParser());
app.use(session(sessionOptions));

// ejs is used to send back the html templates
app.engine('ejs', engine); // use ejs-locals for all ejs templates
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

// Form parameters are used for req/res payloads of this app
app.use(bodyParser.urlencoded({ extended: true }));

// Import our modules for the app
var login = require('./routes/login');
var consent = require('./routes/consent');
var registration = require('./routes/registration');

// This function is used to check the existence of the user attribute from the
// session object.  If it's not available, we redirect back to the login page.
function restrict(req, res, next) {
  if (req.session.user) {
    next();
  } else {
    // console.log('Session User: '+req.session.user);
    req.session.error = 'Access denied!';
    res.redirect(302,utils.getBasePath(req)+'/login'+req.url.substring(req.url.indexOf('?')));
  }
};

// Login Routes
app.get('/login', login.get);
app.post('/login', login.post);

// Consent Routes
app.get('/consent', restrict, consent.get);
app.post('/consent', restrict, consent.post);

// Registration Routes
app.get('/register', registration.get);
app.post('/register', registration.post);

app.listen(app.get('port'), function() {
    console.log('Node HTTP server is listening on port '+app.get('port')+'...');
});
