var passport = require('passport'),
    login = require('connect-ensure-login');

exports.account = [ //function(req, res) {
    login.ensureLoggedIn(),
    function(req, res) {
        res.render('account', { user: req.user });
    }
];

exports.getLogin = function(req, res) {
    res.render('login');//, {
};

exports.admin = function(req, res) {
    res.send('access granted admin!');
};

// POST /login
exports.postLogin = passport.authenticate('local', {
        successReturnToOrRedirect: '/', failureRedirect: '/login'
    });



exports.logout = function(req, res) {
    req.logout();
    res.redirect('/');
};

/**
 * ????should this go in the oauth2 route?
 *
 * OAuth2 stuff from jaredhanson/oauth2orize
 */
//exports.login = passport.authenticate('local', {
//                    successReturnToOrRedirect: '/', failureRedirect: '/login' 
//                });


