module.exports = function(app) {

    // Home/main
    app.get('/', function(req, res) {
        res.render('index', {
            title: '{%= name %}',
            user: req.user
        });
    });

    // Login
    app.get('/login', function(req, res) {
        res.render('login', {
            title: '{%= name %}',
            user: req.user
        });
    });

};
