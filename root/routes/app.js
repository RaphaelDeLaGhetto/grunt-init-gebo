'use strict';

var //passport = require('passport'),
    login = require('connect-ensure-login');//,
//    db = require('../config/dbschema');

exports.demoApp = [
//    passport.authenticate('bearer', { session: false }),
    login.ensureLoggedIn(),
    function (req, res) {
        res.redirect('http://localhost:4000');
      }
  ];

