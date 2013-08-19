var connect = require('connect'),
    http = require('http');//,
//    fs = require('fs');

//var writeStream = fs.createWriteStream('/log/demo.log', {
//            'flags': 'a',
//            'encoding': 'utf8',
//            'mode': 0666
//            });

                    
http.createServer(connect()
                .use(connect.logger({format: 'dev'}))//, stream: writeStream}))
                .use(connect.static(__dirname), {redirect: true})
                ).listen(8000);

