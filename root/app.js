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
    , util = require('util');

// Logging
var logger = new (winston.Logger)({ transports: [ new (winston.transports.Console)({colorize:true}) ] });

// load the settings
require('./settings')(app, express, passport, logger)

// merge nconf overrides with the configuration file.
nconf.argv().env().file({ file: 'local.json' });

// Basic routes
app.get('/', basic_routes.index);

// Authenticated user routes
app.get('/account', pass.ensureAuthenticated, user_routes.account);
app.get('/login', user_routes.getLogin);
app.post('/login', user_routes.postLogin);
app.get('/admin', pass.ensureAuthenticated, pass.ensureAdmin(), user_routes.admin);
app.get('/logout', user_routes.logout);

logger.info('listening on', nconf.get('port'));

app.listen(process.env.PORT || nconf.get('port'));

