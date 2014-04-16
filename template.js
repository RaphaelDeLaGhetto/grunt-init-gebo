/**
 * https://github.com/RaphaelDeLaGhetto/grunt-init-gebo
 *
 * Copyright 2013 Daniel Bidulock
 * MIT license
 */

'use strict';

// Basic template description.
exports.description = 'A vanilla gebo agent with nodeunit unit tests.';

// Template-specific notes to be displayed before question prompts.
exports.notes = '';

// Template-specific notes to be displayed after question prompts.
exports.after = 'Be sure to install project dependencies with _npm ' +
    'install_ and _bower install_. After that, you may execute project tasks with _grunt_. For ' +
    'more information about installing and configuring Grunt, see ' +
    'the Getting Started guide:' +
    '\n\n' +
    'http://gruntjs.com/getting-started';

// Any existing file or directory matching this wildcard will cause a warning.
exports.warnOn = '*';

// The actual init template.
exports.template = function(grunt, init, done) {

    init.process({}, [
            // Prompt for these values.
            init.prompt('name'),
            init.prompt('description'),
            init.prompt('version', '0.0.0'),
            init.prompt('repository'),
            init.prompt('homepage'),
            init.prompt('bugs'),
            init.prompt('licenses'),
            init.prompt('author_name'),
            init.prompt('author_email'),
            init.prompt('author_url'),
            init.prompt('node_version'),
            init.prompt('main', '<project-name>.js'),
            init.prompt('npm_test', 'grunt nodeunit')
        ],
        function(err, props) {
            props.main = props.name + '.js';

            // Remove hyphens from name and conver to camel case
            props.camelCasedName = props.name.replace(/-([a-z])/g,
                    function (g) { return g[1].toUpperCase(); });

            props.keywords = [
                    'gebo',
                    'agent',
                ];
            props.dependencies = {
                    'gebo-server': '*',
                    'mongoose': '*',
                    'nconf': '*',
                    'q': '*',
                    'strong-cluster-express-store': '0.0.x',
                };
            props.devDependencies = {
                    'database-cleaner': '~0.7.0',
                    'grunt': '~0.4.1',
                    'grunt-contrib-jshint': '~0.6.2',
                    'grunt-contrib-nodeunit': '~0.2.0',
                    'grunt-contrib-watch': '~0.4.0',
                    'nock': '~0.22.1',
                };
        
            // Files to copy (and process).
            var files = init.filesToCopy(props);
        
            // Add properly-named license files.
            init.addLicenseFiles(files, props.licenses);
        
            // Actually copy (and process) files.
            init.copyAndProcess(files, props);
        
            // Remove the camelCasedName, because we
            // don't really need it anymore
            delete props.camelCasedName;

            // Generate package.json file.
            init.writePackageJSON('package.json', props);
        
            // All done!
            done();
      });
  };

