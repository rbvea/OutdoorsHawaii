var http = require('http');
/*
 * GET home page.
 */
exports.index = function(req, res){
  res.render('index', { title: 'Outdoors Hawaii' });
};


var parksUrl= 'http://services.arcgis.com/tNJpAOha4mODLkXz/ArcGIS/rest/services/Parks/FeatureServer/0/query';

var options = {
    host: 'services.arcgis.com'
};
   
exports.init = function(req, res) {

}

exports.landing = function(req, res) {
    res.render('landing');
};
