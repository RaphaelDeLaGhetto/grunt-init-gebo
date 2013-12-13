var gebo = require('gebo-server')(__dirname),
    actions = require('./actions')(gebo);

gebo.start();

