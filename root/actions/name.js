'use strict';
var q = require('q');

module.exports = function(gebo) {

    /**
     * This is a sample action intended to demonstrate how an action is
     * defined. It takes two parameters:
     *
     * 1. verified = {
     *          dbName: <string>,
     *          collectionName: <string>,
     *          admin: <bool>,
     *          read: <bool>,
     *          write: <bool>,
     *          execute: <bool>,
     *      }
     *
     * 2. message = {
     *          sender: <string>,
     *          receiver: <string>,
     *          performative: <string>,
     *          action: <string>,
     *          gebo: <string>,
     *          conversationId: <string>,
     *          content: {
     *                  <Any valid JSON>
     *              },
     *      }
     *
     * Since most actions make asynchronous database calls, all actions 
     * must return a promise.
     */
    var _hello = function(verified, message) {
        var deferred = q.defer();

        // Is the sending agent a gebo administrator or someone
        // permitted to read the collection stored in the database?
        if (verified.admin || verified.read) {
          var agentDb = new gebo.agentSchema(verified.dbName);
          agentDb.friendModel.findOne({ email: message.sender }, function(err, friend) {
                  agentDb.connection.db.close();
                  if (err) {
                    deferred.reject(err);
                  }
                  else {
                    deferred.resolve('Hello, ' + friend.name + '. It\'s nice to hear from you');
                  }
            });
        }
        // Or, as in this case concerning agent friendship, is the
        // sending agent unknown to the receiving agent?
        else {
          deferred.reject('Hello, Stranger. Peace be with you');
        }

        return deferred.promise;
      };
    exports.hello = _hello;

    /**
     * Add the action to the gebo. This doesn't have to happen here,
     * but it does have to happen somewhere. Why not here, since
     * you've got the gebo object handy anyway?
     */
    gebo.actions.add('hello', _hello);

    return exports;
  };
