grunt-init-gebo
===============

This grunt template creates a vanilla, ready-to-deploy [gebo-server](https://github.com/RaphaelDeLaGhetto/gebo-server).

## Getting Started

### Setup the database

Install MongoDB on your system, if you haven't already:

* [http://docs.mongodb.org/manual/installation/](http://docs.mongodb.org/manual/installation/)

Start MongoDB by executing this at the command line:

```
$ sudo service mongodb start
```

These instructions are also outlined in your new gebo's
[README.md](https://github.com/RaphaelDeLaGhetto/grunt-init-gebo/blob/master/root/README.md).

### Setup grunt
if you haven't already, that is... gebo currently depends on Grunt 0.4.1. This requires a bit of prep work.

```
$ sudo npm install grunt-cli -g
$ sudo npm install grunt-init -g
```

The first command enables you to run the grunt installed locally, automatically. The second allows you to call grunt-init on this template.

### Next, install the template
This is going in your `~/.grunt-init/` directory

```
$ git clone https://github.com/RaphaelDeLaGhetto/grunt-init-gebo.git ~/.grunt-init/gebo
```

### Create a new project:

```
$ mkdir mynewproject
$ cd mynewproject
$ grunt-init gebo
$ sudo npm install
$ bower install
```

### Run your server

```
$ node server.js
```

and go to <http://localhost:3000>.

## Contributing

In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any
new or changed functionality. Lint and test your code using [grunt](https://github.com/gruntjs/grunt).

## License

MIT
