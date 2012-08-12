var center =  new L.LatLng(21.460737,-157.997818);
var found = false;
var map;

function success(position) {
    map.panTo(new L.LatLng(position.coords.latitude, position.coords.longitude));
    map.setZoom(13);
}

function error() {
    console.log('whoops, something happened');
}


if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(success, error);
}


var SW = new L.LatLng(21.25, -158.23);
var NE = new L.LatLng(21.7, -157.65);

var bounds = new L.LatLngBounds(SW, NE);

var map = new L.Map('map', {
    minZoom: 8,
    center: center, 
    zoom:    10, 
    //maxBounds: bounds,
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
    },
    popupTemplate: "<h3>{NAME}</h3><p>{DESCRIPT}</p>",
});


parks.setMap(map);
