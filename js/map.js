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

var esriLayer = new L.TileLayer.ESRI("http://services.arcgisonline.com/ArcGIS/rest/services/NatGeo_World_Map/MapServer")
map.addLayer(esriLayer);

var testUrl = 'http://services.arcgis.com/tNJpAOha4mODLkXz/ArcGIS/rest/services/Parks/FeatureServer/0';

var parks = new lvector.AGS({
    url: testUrl,
    fields: '*',
    uniqueField: 'OBJECTID',
    scaleRange: [8, 13],
    symbology: {
        type: "single",
        vectorOptions: {
            fillColor: "#111",
            fillOpacity: 1.0,
            weight: 1,
            color: "#111"
            }
    }
});

parks.setMap(map);
