var url = 'http://rbvea.isa-geek.com:8888/v2/outdoorshawaii/{z}/{x}/{y}.png';

//var jsonUrl = 'http://192.168.1.2:7777/tiles/metadata.json';

var center = new L.LatLng(21.460737,-157.997818);

var SW = new L.LatLng(18.6567, -160.3949);
var NE = new L.LatLng(22.5887, -156.6051);

var bounds = new L.LatLngBounds(SW, NE);

var tileLayer = new L.TileLayer(url);

var map = new L.Map('map', {
    minZoom: 8,
    center: center, 
    zoom: 8, 
    maxBounds: bounds,
});

map.addLayer(tileLayer)
   .setView(center, 9);
