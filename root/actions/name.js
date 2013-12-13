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
          deferred.resolve();
        }
        // Or, as in this case concerning agent friendship, is the
        // sending agent unknown to the receiving agent?
        else {
          deferred.reject();
        }

        return deferred.promise();
      };
    exports.hello = _hello;

    return exports;
  };
