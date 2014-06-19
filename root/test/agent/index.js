'use strict';

// Put the agent into test mode
var agent = require('../../agent')(true);

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
 *      2014-6-19 The above (point 2) is no longer entirely true
 */
var agentDb = new agent.schemata.agent();


/**
 * hello
 */
exports.hello = {
    setUp: function(callback) {

        /**
         * Add a friend to the agent schema
         */
        var friendo = new agentDb.friendoModel({
                        name: 'John',
                        email: 'john@painter.com',
                        gebo: 'https://somegebo.com',
                    });
        friendo.permissions.push({ resource: 'hello', execute: true });

        friendo.save(function(err) {
            if (err) {
              console.log(err);
            }
            callback();
          });
    },

    tearDown: function(callback) {
        agentDb.connection.db.dropDatabase(function(err) {
            if (err) {
              console.log(err);
            }
            callback();
          });
    },

    'Return a friendly greeting to a friendly agent': function(test) {
        test.expect(1);
        agent.actions.hello({ resource: 'hello', execute: true },
                           { sender: 'john@painter.com' }).
            then(function(greeting) {
                test.equal(greeting, 'Howdy, John! Word to your mom.');
                test.done();
              }).
            catch(function(err) {
                test.ok(false, err);      
                test.done();
              });
    },

    'Return a friendly greeting to an unknown agent': function(test) {
        test.expect(1);
        agent.actions.hello({ resource: 'hello' },
                           { sender: 'yanfen@example.com' }).
            then(function(greeting) {
                test.ok(false, 'Shouldn\'t get here');
                test.done();
              }).
            catch(function(err) {
                test.equal(err, 'Hello, stranger. Peace be with you.');
                test.done();
              });
    },
  };

