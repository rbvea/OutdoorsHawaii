var express = require('express');
var fs = require('fs');

var app = express();

app.use(express.static(__dirname + '/public'));

app.configure('production', function() {
    app.use(express.static(__dirname + '/public'));
}); 



app.get('/', function(req, res) {
    fs.readFile('index.html', function(err, data) {
        if(err) throw err;
       	res.end(data); 
    });
});

var port = process.env.PORT || 1717;
console.log('listening on port: ' +  port)

app.listen(port, function() {
    console.log('listening on port: ' +  port)
});

