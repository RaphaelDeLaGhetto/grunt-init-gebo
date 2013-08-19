# {%= name %}

{%= description %}

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

When you want to start adding your own users, you can erase the existing database like this:

```
grunt dbdrop
```

### Initialize the sample Angular webapp
{%= name %} is an Angular app delivery system. Every app delivered by {%= name %} has its own dependencies independent of the server (what with Angular being client-side, and all).

```
$ cd apps/demoApp
$ npm install
$ bower install
$ grunt
```


# Start the application.

```
node server.js
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [grunt](https://github.com/gruntjs/grunt).

## License
Copyright (c) {%= grunt.template.today('yyyy') %} {%= author_name %}
{%= licenses.join(', ') %} license{%= licenses.length === 1 ? '' : 's' %}.
