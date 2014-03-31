//
//var gebo = require('gebo-server')(__dirname),
//    actions = require('./actions')(gebo),
//    schemata = require('./schemata');
//
//gebo.schemata.add(schemata);
//
//gebo.start();
//

var cluster = require('cluster');


/**
 * The clustering stuff is courtesy of Rowan Manning
 * http://rowanmanning.com/posts/node-cluster-and-express/
 * 2014-2-28
 */
if (cluster.isMaster) {

    require('strong-cluster-connect-store').setup();

    // Count the machine's CPUs
    var cpuCount = require('os').cpus().length;

    // Create a worker for each CPU
    for (var i = 0; i < cpuCount; i += 1) {
      cluster.fork();
    }

    // Listen for dying workers
    cluster.on('exit', function (worker) {
        // Replace the dead worker,
        // we're not sentimental
        console.log('Worker ' + worker.id + ' died :(');
        cluster.fork();
      });
}
else {
   var gebo = require('gebo-server')(__dirname);
   
   gebo.start();

   console.log('Worker ' + cluster.worker.id + ' running!');
}
