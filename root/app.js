var express = require('express')
    , app = express()
    , nconf = require('nconf')
    , winston = require('winston')

    // From jaredhanson/passport-local
    , db = require('./config/dbschema')
    , pass = require('./config/pass')
    , passport = require('passport')
    , user_routes = require('./routes/user')
    , basic_routes = require('./routes/basic')

    // From jaredhanson/oauth2orize
//    , site = require('./site')
//    , oauth2 = require('./oauth2')
//    , user = require('./user')
    , oauth2_routes = require('./routes/oauth2')
    , util = require('util');
    

// Logging
var logger = new (winston.Logger)({ transports: [ new (winston.transports.Console)({colorize:true}) ] });

// Load the settings
require('./settings')(app, express, passport, logger);

// Merge nconf overrides with the configuration file.
nconf.argv().env().file({ file: 'local.json' });

// Basic routes
app.get('/', basic_routes.index);

// Authenticated user routes
app.get('/account', user_routes.account);
app.get('/login', user_routes.getLogin);
app.post('/login', user_routes.postLogin);
app.get('/admin', pass.ensureAuthenticated, pass.ensureAdmin(), user_routes.admin);
app.get('/logout', user_routes.logout);

// OAuth2 routes
app.get('/dialog/authorize', oauth2_routes.authorization); 
app.post('/dialog/authorize/decision', oauth2_routes.decision); 
app.post('/oauth/token', oauth2_routes.token);
app.get('/api/userinfo', user_routes.account);

logger.info('listening on', nconf.get('port'));
app.listen(process.env.PORT || nconf.get('port'));

