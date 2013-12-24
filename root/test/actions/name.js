
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
         *  1. gebo:
         *      This defines data models handled exclusively
         *      by the gebo himself (e.g., registrant and 
         *      token models)
         *
         *  2. agent:
         *      This defines the basic data models that enable
         *      a registered agent to manage his relationships
         *      and data (e.g., friend, permission, and file
         *      models). This schema is subsumed by the gebo
         *      schema.
         *
         * Here, I'm adding a friend to the agent schema
         */
        var agentDb = new gebo.schemata.agent('dan@example.com');
        var friend = new agentDb.friendModel({
                        name: 'John',
                        email: 'john@painter.com',
                        gebo: 'https://somegebo.com',
                    });

        friend.save(function(err) {
            if (err) {
              console.log(err);
            }

            /**
             * Make sure you close the database connection!
             */
            agentDb.connection.db.close();
            callback();
          });
    },

    tearDown: function(callback) {
        var agentDb = new gebo.schemata.agent('dan@example.com');
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
        test.expect(1);
        var actions = require('../../actions')(gebo);
        actions.hello({ dbName: 'dan@example.com', read: true },
                      { sender: 'john@painter.com' }).
            then(function(greeting) {
                test.equal(greeting, 'Hello, John. It\'s nice to hear from you');
                test.done();
              }).
            catch(function(err) {
                console.log(err);
                test.ok(false, 'Shouldn\'t get here');      
                test.done();
              });
    },

    'Return a friendly greeting to an unknown agent': function(test) {
        test.expect(1);
        var actions = require('../../actions')(gebo);
        actions.hello({ dbName: 'dan@example.com' },
                      { sender: 'yanfen@example.com' }).
            then(function(greeting) {
                test.ok(false, 'Shouldn\'t get here');      
                test.done();
              }).
            catch(function(err) {
                test.equal(err, 'Hello, Stranger. Peace be with you');
                test.done();
              });
    },
  };

