'use strict';

var utils = require('gebo-server')(__dirname + '/..').utils;

module.exports = function (email) {

    // Turn the email into a mongo-friendly database name
    var dbName = utils.ensureDbName(email);

    var mongoose = require('mongoose');

    /**
     *  Database config
     */
    var uristring =
            process.env.MONGOLAB_URI ||
            process.env.MONGOHQ_URL ||
            'mongodb://localhost/' + dbName;

    var mongoOptions = { db: { safe: true } };

    /**
     * Connect to mongo
     */
    var connection = mongoose.createConnection(uristring, mongoOptions);

    connection.on('open', function() {
        console.log ('Successfully connected to: ' + uristring);
      });

    connection.on('error', function(err) {
        console.log ('ERROR connecting to: ' + uristring + '. ' + err);
      });

    exports.connection = connection;

    var Schema = mongoose.Schema,
        ObjectId = Schema.Types.ObjectId;

    /**
     * Greeting schema
     */
    var greetingSchema = new Schema({
        text: { type: String, required: true, unique: false },
      });

    // Export greeting model
    try {
        var greetingModel = connection.model('Greeting', greetingSchema);
        exports.greetingModel = greetingModel;
    }
    catch (error) {}

    return exports;
  };

