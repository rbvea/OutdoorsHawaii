var http = require('http');
/*
 * GET home page.
 */
exports.index = function(req, res){
  res.render('index', { title: 'Outdoors Hawaii' });
};


var parksUrl= 'http://services.arcgis.com/';

var options = {
    host: 'services.arcgis.com',
    //path: 'tNJpAOha4mODLkXz/ArcGIS/rest/services/Parks/FeatureServer/0/query?where=1%3D1&geometryType=esriGeometryEnvelope&returnIdsOnly=false&returnCountOnly=false&f=json'
};
   
exports.landing = function(req, res) {
    res.render('landing');
};

exports.filters = function(req, res) {
    res.render('filters');
}
