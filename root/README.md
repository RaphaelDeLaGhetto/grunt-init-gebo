# {%= name %}

{%= description %}

## Setup

### your database (MongoDB)

Install MongoDB on your system, if you haven't already:

* [http://docs.mongodb.org/manual/installation/](http://docs.mongodb.org/manual/installation/)

Start MongoDB by executing this at the command line:

```
$ sudo service mongodb start
```

### your server

First, install your npm modules:

```
$ sudo npm install
```

# Agent/token management

Currently, the functionality offered by the grunt-registered tasks provide the best way to assign tokens to agents.

## Add agent

From the project directory...

### Register agent

```
grunt registeragent:SomeGuy:someguy@example.com:secretpassword123:false
```

### Friend agent

```
grunt friendo:SomeGuy:someguy@example.com
```

### Set permissions

```
grunt setpermission:someguy@example.com:someactionorresource:false:false:true
```

### Create token

```
grunt createtoken:someguy@example.com:ThisIsMyTokenLetMeIn123
```

# Development testing

The fast way to get up and running.

## Seed the database

This inserts a couple of test users into your database to confirm that authentication is working.

```
$ grunt dbseed
```

When you want to start adding your own users, you can erase the existing database like this:

```
$ grunt dbdrop
```

# Run your server

```
$ node server.js
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [grunt](https://github.com/gruntjs/grunt).

## License
Copyright (c) {%= grunt.template.today('yyyy') %} {%= author_name %}
{%= licenses.join(', ') %} license{%= licenses.length === 1 ? '' : 's' %}.
