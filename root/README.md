# {%= name %}

{%= description %}

These project include:

* [wolfeidau/grunt-express-bootstrap](https://github.com/wolfeidau/grunt-express-bootstrap)
    * [connect-cachify](https://github.com/mozilla/connect-cachify)
    * [twitter bootstrap](http://twitter.github.com/bootstrap/)
    * [JQuery](http://jquery.com/)
    * [bower](http://twitter.github.com/bower/)
    * [jade](http://jade-lang.com/)
    * [winston-request-logger](https://github.com/wolfeidau/winston-request-logger)

* [jaredhanson/passport-local](https://github.com/jaredhanson/passport-local)
    * express
    * passport
    * passport-local
    * mongoose
    * bcrypt
    
* [jaredhanson/oauth2orize](https://github.com/jaredhanson/oauth2orize)
    * oauth2orize
    * passport-http
    * passport-http-bearer
    * passport-oauth2-client-password
    * connect-ensure-login

## Setup

### your database (MongoDB)

Install MongoDB on your system, if you haven't already:

* [http://docs.mongodb.org/manual/installation/](http://docs.mongodb.org/manual/installation/)

Start MongoDB by executing this at the command line:

```
sudo service mongodb start
```

### your server

First, install your npm modules:

```
npm install
```

Then, install your UI dependencies:

```
bower install
```

# Seed the database
This inserts a couple of test users into your database to confirm that authentication is working.

```
grunt dbseed
```

When you want to start adding your own users, you can erase the exisiting database like this:

```
grunt dbdrop
```

# Start the application.

```
node app.js
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [grunt](https://github.com/gruntjs/grunt).

## Release History
_(Nothing yet)_

## License
Copyright (c) {%= grunt.template.today('yyyy') %} {%= author_name %}
Licensed under the {%= licenses.join(', ') %} license{%= licenses.length === 1 ? '' : 's' %}.
