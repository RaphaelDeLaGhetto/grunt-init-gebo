var express = require("express");
var app = express();

app
    .use(express.vhost('localhost1', require('./app.js').app))
    .use(express.vhost('localhost2', require('./apps/demoApp/dist/app.js').app))
    .listen(3001);


app.get('/', function(req, res){
        res.redirect('http://localhost:3000');
});
