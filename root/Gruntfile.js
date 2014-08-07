'use strict';

var utils = require('gebo-utils'),
    nconf = require('nconf');

nconf.file({ file: './gebo.json' });

module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({

        // Metadata.
        pkg: grunt.file.readJSON('package.json'),
        banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
                   '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
                   '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
                   '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
                   ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',

        // Task configuration.
        nodeunit: {
            files: ['test/**/*.js', '!test/**/mocks/*.js']
        },
        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            gruntfile: {
                src: 'Gruntfile.js'
            },
            apps: {
                src: ['app/**/*.js']
            },
            config: {
                src: ['config/**/*.js']
            },
            lib: {
                src: ['lib/**/*.js']
            },
            routes: {
                src: ['routes/**/*.js']
            },
//            test: {
//                src: ['test/**/*.js']
//            },
        },
        watch: {
            gruntfile: {
                files: '<%= jshint.gruntfile.src %>',
                tasks: ['jshint:gruntfile']
            },
            lib: {
                files: '<%= jshint.lib.src %>',
                tasks: ['jshint:lib', 'nodeunit']
            },
            test: {
                files: '<%= jshint.test.src %>',
                tasks: ['jshint:test', 'nodeunit']
            },
        },
    });

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-nodeunit');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // Default task.
    grunt.registerTask('default', ['jshint', 'nodeunit']);

    /** 
     * Thank you to jaredhanson/passport-local
     * https://github.com/jaredhanson/passport-local
     */
    grunt.registerTask('dbseed', 'seed the database', function () {
        grunt.task.run('registeragent:admin:admin@example.com:secret:true');
        grunt.task.run('registeragent:bob:bob@example.com:secret:false');
        grunt.task.run('friendo:bob:bob@example.com');
        grunt.task.run('friendo:admin:admin@example.com');
      });

    grunt.registerTask('registeragent', 'add an agent to the database',
        function (usr, emailaddress, pass, adm) {
            // convert adm string to bool
            adm = (adm === 'true');

            var gebo = require('gebo-server')();
            var db = new gebo.schemata.gebo(); 

            var agent = new db.registrantModel({
                name: usr,
                email: emailaddress,
                password: pass,
                admin: adm
              });
    
            // save call is async, put grunt into async mode to work
            var done = this.async();

            agent.save(function (err) {
                if (err) {
                  console.log('Error: ' + err);
                  done(false);
                }
                else {
                  console.log('Registered ' + agent.name);
                  done();
                }
              });
          });

    grunt.registerTask('dbdrop', 'drop the database',
        function () {
            // async mode
            var done = this.async();

            var geboMongoose = require('gebo-mongoose-connection');
            var mongoose = geboMongoose.get();
            geboMongoose.on('mongoose-connect', function () {
                mongoose.connection.db.dropDatabase(function (err) {
                    if (err) {
                      console.log('Error: ' + err);
                      done(false);
                    }
                    else {
                      console.log('Successfully dropped db');
                      done();
                    }
                  });
              });
          });

    /**
     * friendo
     */
    grunt.registerTask('friendo', 'add a friendo to the agent specified',
        function (name, email, geboUri) {

            // Put grunt into async mode
            var done = this.async();
 
            var gebo = require('gebo-server')();
            var agentDb = new gebo.schemata.agent(); 

            var friendo = new agentDb.friendoModel({
                    name: name,
                    email: email,
                    uri: geboUri,
                });
        
            // Can't modify ID in findOneAndUpdate
            friendo._id = undefined;
       
            agentDb.friendoModel.findOneAndUpdate({ email: friendo.email },
                    friendo.toObject(),
                    { upsert: true },
                    function (err) {
                        if (err) {
                          console.log('Error: ' + err);
                          done(false);
                        }
                        else {
                          console.log('Saved friendo: ' + friendo.name);
                          done();
                        }
                      });
          });

    /**
     * setpermission
     */
    grunt.registerTask('setpermission', 'Set access to an agent\'s resource',
        function(friendoAgent, resource, read, write, execute) {
            var gebo = require('gebo-server')();
            var agentDb = new gebo.schemata.agent(); 
            
            // Save call is async. Put grunt into async mode to work
            var done = this.async();

            agentDb.friendoModel.findOne({ email: friendoAgent },
                function(err, friendo) {
                    if (err) {
                      console.log(err);
                    }

                    var index = utils.getIndexOfObject(friendo.permissions, 'resource', resource);

                    if (index > -1) {
                      friendo.permissions.splice(index, 1);
                    }
                    friendo.permissions.push({ resource: resource,
                                               read: read === 'true', 
                                               write: write === 'true', 
                                               execute: execute === 'true', 
                                             });

                    friendo.save(function(err) {
                        if (err) {
                          console.log(err);
                        }
                        done();
                      });
                  });
          });

    /**
     * createtoken
     */
    grunt.registerTask('createtoken', 'Create an access token for a registrant',
        function(email,  tokenString) {
            var gebo = require('gebo-server')();
            var agentDb = new gebo.schemata.agent(); 
 
            // Save call is async. Put grunt into async mode to work
            var done = this.async();

            agentDb.friendoModel.findOne({ email: email },
                function(err, friendo) {
                    if (err) {
                      console.log(err);
                    }

                    var db = new gebo.schemata.gebo(); 
                    var token = new db.tokenModel({
                                            friendoId: friendo._id,
                                            string: tokenString,
                                        });

                    token.save(function(err) {
                        if (err) {
                          console.log(err);
                        }
                        done();
                      });
                  });
          });
  };
