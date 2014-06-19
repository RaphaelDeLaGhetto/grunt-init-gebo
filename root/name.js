'use strict';

var cluster = require('cluster'),
    winston = require('winston');
var logger = new (winston.Logger)({ transports: [ new (winston.transports.Console)({ colorize: true }) ] });

/**
 * The clustering stuff is courtesy of Rowan Manning
 * http://rowanmanning.com/posts/node-cluster-and-express/
 * 2014-2-28
 */
if (cluster.isMaster) {

    require('strong-cluster-express-store').setup();

    // Count the machine's CPUs
    var cpuCount = require('os').cpus().length;

    // Create a worker for each CPU
    for (var i = 0; i < cpuCount; i += 1) {
      cluster.fork();
    }

    // Listen for dying workers
    cluster.on('exit', function (worker) {
        logger.info('Worker ' + worker.id + ' croaked');
        cluster.fork();
      });
}
else {
    var agent = require('./agent')();
    agent.start();
    logger.info('Hello, Worker ' + cluster.worker.id);
}
