
var gebo = require('gebo-server')(__dirname + '/../..');

/**
 * hello
 */
exports.hello = {
    setUp: function(callback) {

        /**
         * A vanilla gebo comes equipped with two mongoose
         * schemas: 
         *
         *  1. geboSchema:
         *      This defines data models handled exclusively
         *      by the gebo himself (e.g., registrant and 
         *      token models)
         *
         *  2. agentSchema:
         *      This defines the basic data models that enable
         *      a registered agent to manage his relationships
         *      and data (e.g., friend, permission, and file
         *      models). This schema is subsumed by the gebo
         *      schema.
         *
         * Here, I'm adding a friend to the agent schema
         */
        var agentDb = new gebo.agentSchema('dan@example.com');
        var friend = new agentDb.friendModel({
                        name: 'John',
                        email: 'john@painter.com',
                        gebo: 'https://somegebo.com',
                    });

        friend.save(function(err) {
            if (err) {
              console.log(err);
            }

            // Make sure you close the database connection!
            agentDb.connection.db.close();
            callback();
          });
    },

    tearDown: function(callback) {
        var agentDb = new gebo.agentSchema('dan@example.com');
        agentDb.connection.on('open', function(err) {
            agentDb.connection.db.dropDatabase(function(err) {
                if (err) {
                  console.log(err);
                }
                agentDb.connection.db.close();
                callback();
              });
          });
    },

    'Return a friendly greeting to a friendly agent': function(test) {
        test.done();
    },

    'Return a friendly greeting to an unknown agent': function(test) {
        test.done();
    },
  };
