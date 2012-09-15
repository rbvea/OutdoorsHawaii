var express = require('express');
var fs = require('fs');
var Firebase = require('./firebase-node');
var $ = require('jQuery');

var app = express();

app.use(express.static(__dirname + '/public'));

app.configure('production', function() {
    app.engine('jade', require('jade').__express);
    app.use(express.static(__dirname + '/public'));
}); 

app.get('/', function(req, res) {
    fs.readFile('index.html', function(err, data) {
        if(err) throw err;
       	res.end(data); 
    });
});

app.get('/init', function(req, res) {

    var testUrl = 'http://services.arcgis.com/tNJpAOha4mODLkXz/ArcGIS/rest/services/Parks/FeatureServer/0/query';

    $.get(testUrl, 
          {
              where : '1=1',
              objectIds: null,
              geometry: null, 
              geometryType: 'esriGeometryEnvelope',
              inSR: "4326",
              spatialRel: 'esriSpatialRelIntersects',
              outFields: '*',
              returnGeometry: true,
              maxAllowableOffset: null,
              geometryPrecision: null,
              outSR: '4326',
              returnIdsOnly: false,
              returnCountOnly: false,
              orderByFields: null,
              groupByFieldsForStatistics: null,
              outStatistics: null,
              f: 'json',
              token: null,
          },function(data) {
              var map = $.parseJSON(data);
              for(i in map.features) {
                  var park = parksData.features[i];
                  console.log(i);
              }
              res.end('------FIN-------');
    })
});


var port = process.env.PORT || 1717;

app.listen(port, function() {
    console.log('listening on port: ' +  port)
});
