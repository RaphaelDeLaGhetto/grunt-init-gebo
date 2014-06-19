'use strict';

var q = require('q');

/**
 * Howdy! Use this file to setup your gebo agent. You can define
 * actions and schemata, or enable behaviours from action modules.
 *
 * @param bool - true for test mode
 * @return object - the gebo
 */
module.exports = function(testing) {

    /**
     * Here's your vanilla gebo server with basic
     * actions and schemata
     */
    var gebo = require('gebo-server')(testing),
        agentDb = new gebo.schemata.agent();

    /**
     * The following provides an example of the basic pattern of
     * every gebo action
     */
    gebo.actions.add('hello', function(verified, message) {
        var deferred = q.defer();
    
        if (verified.admin || verified.execute) {
          agentDb.friendoModel.findOne({ email: message.sender }, function(err, friend) {
                if (err) {
                  deferred.reject(err);
                }
                else {
                  deferred.resolve('Howdy, ' + friend.name + '! Word to your mom.');
                }
            });
        }
        else {
          deferred.reject('Hello, stranger. Peace be with you.');
        }
        return deferred.promise;
      });

    /**
     * This is an example of how you might define a
     * schema. Personally, I think it's better to modularize
     * this sort of junk, but this is still a legitimate
     * way to do it.
     */
    var greetingSchema = new gebo.mongoose.Schema({
        text: { type: String, required: true, unique: false },
      });

    try {
        var greetingModel = gebo.mongoose.model('Greeting', greetingSchema);
        gebo.schemata.add('greetingModel', greetingModel);
    }
    catch (error) {}

    return gebo;
};

