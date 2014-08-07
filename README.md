grunt-init-gebo
===============

This grunt template creates a vanilla, ready-to-deploy [gebo-server](https://github.com/RaphaelDeLaGhetto/gebo-server).

## Getting Started

### Setup the database

Install MongoDB on your system, if you haven't already:

* [http://docs.mongodb.org/manual/installation/](http://docs.mongodb.org/manual/installation/)

Start MongoDB by executing this at the command line:

```
sudo service mongodb start
```

These instructions are also outlined in your new gebo's
[README.md](https://github.com/RaphaelDeLaGhetto/grunt-init-gebo/blob/master/root/README.md).

### Setup grunt
if you haven't already, that is... gebo currently depends on Grunt 0.4.1. This requires a bit of prep work.

```
sudo npm install grunt-cli -g
sudo npm install grunt-init -g
```

The first command enables you to run the grunt installed locally, automatically. The second allows you to call grunt-init on this template.

### Next, install the template
This is going in your `~/.grunt-init/` directory

```
git clone https://github.com/RaphaelDeLaGhetto/grunt-init-gebo.git ~/.grunt-init/gebo
```

### Create a new project:

```
mkdir mynewproject
cd mynewproject
grunt-init gebo
sudo npm install
```

### Run your server

```
$ node server.js
```

and go to <http://localhost:3000>.

## Add agent

From the project directory...

### Register agent

This is mostly for human agents who need traditional username/password access through some human-agent interface. A friendo does not need to be a registered agent, though a registered agent does need to be a friendo with permissions set to access any given gebo resource (unless that registered agent is an administrator, that is).

```
grunt registeragent:SomeGuy:someguy@example.com:secretpassword123:false
```

### Friendo agent

A friendo is an agent to whom you may assign an access token.

```
grunt friendo:SomeGuy:someguy@example.com
```

### Set permissions

The _someaction_ parameter may also specify a database collection name.

```
grunt setpermission:someguy@example.com:someactionorresource:false:false:true
```

### Create token

This token allows an agent access to all the resources to which he's already been granted permission.

```
grunt createtoken:someguy@example.com:ThisIsMyTokenLetMeIn123
```

## Contributing

Hit me with it.

## License

MIT
