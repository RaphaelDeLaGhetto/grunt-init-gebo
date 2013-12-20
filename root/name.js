var gebo = require('gebo-server')(__dirname),
    actions = require('./actions')(gebo),
    schemata = require('./schemata');

gebo.schemata.add(schemata);

gebo.start();

