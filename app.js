var express = require('express');
var fs = require('fs');

var app = express();

var url =  'http://{s}.tile.cloudmade.com/02e10ae557e042ab9d012ef400178054/997/256/{z}/{x}/{y}.png';

app.get('/', function(req, res) {
    fs.readFile('index.html', function(err, data) {
        if(err) throw err;
       	res.end(data); 
});
});

app.listen(1717);
