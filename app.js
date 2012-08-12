var express = require('express');
var fs = require('fs');

var app = express();

app.get('/', function(req, res) {
    fs.readFile('index.html', function(err, data) {
        if(err) throw err;
       	res.end(data); 
    });
});

var port = process.env.PORT || 1717;

app.listen(port);
