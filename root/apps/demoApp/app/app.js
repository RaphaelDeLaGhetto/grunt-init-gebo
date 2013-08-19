var connect = require('connect'),
    app = require('http');//,
//    fs = require('fs');

// Expose the server for the purpose of
// virtual hosting
exports.app = app;

//var writeStream = fs.createWriteStream('/log/demo.log', {
//            'flags': 'a',
//            'encoding': 'utf8',
//            'mode': 0666
//            });

                    
app.createServer(connect()
                .use(connect.logger({format: 'dev'}))//, stream: writeStream}))
                .use(connect.static(__dirname), {redirect: true})
                ).listen(4000);

