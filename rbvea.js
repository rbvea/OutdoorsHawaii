//var url = 'http://localhost:8888/v2/outdoorshawaii/{z}/{x}/{y}.png';
var url =  'http://{s}.tile.cloudmade.com/02e10ae557e042ab9d012ef400178054/997/256/{z}/{x}/{y}.png';

var center = new L.LatLng(21.460737,-157.997818);

var SW = new L.LatLng(18.6567, -160.3949);
var NE = new L.LatLng(22.5887, -156.6051);

var bounds = new L.LatLngBounds(SW, NE);

var tileLayer = new L.TileLayer(url);

var map = new L.Map('map', {
    minZoom: 10,
    center: center, 
    zoom:   10 , 
    maxBounds: bounds,
});

/*
map.addLayer(tileLayer)
   .setView(center, 9);*/

var esriLayer = new L.TileLayer.ESRI("http://services.arcgisonline.com/ArcGIS/rest/services/NatGeo_World_Map/MapServer")
map.addLayer(esriLayer);

var parks = new L.TileLayer.ESRI('http://tiles.arcgis.com/tiles/tNJpAOha4mODLkXz/arcgis/rest/services/Parks/MapServer');
map.addLayer(parks);


/*
var layer = new L.TileLayer.ESRI('http://tiles1.arcgis.com/tiles/tNJpAOha4mODLkXz/arcgis/rest/services/Parks/MapServer/');

map.addLayer(layer);
*/
