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
});

var esriLayer = new L.TileLayer.ESRI("http://services.arcgisonline.com/ArcGIS/rest/services/NatGeo_World_Map/MapServer")
map.addLayer(esriLayer);

var testUrl = 'http://services.arcgis.com/tNJpAOha4mODLkXz/ArcGIS/rest/services/Parks/FeatureServer/0/query';

var parks;

function parks($scope) {
    
}

var testGet = $.get(testUrl, 
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
                        var parks = $.parseJSON(data);
                        for(var i in parks.features) {
                            var park = parks.features[i];
                            
                            L.marker([park.geometry.y,park.geometry.x])
                            /*
                                .on('click', function(e){
                                  var marker = this;
                                  var popup = marker.bindPopup('<div class="park_popup"/><h3>' + park.attributes.NAME + '</h3><p>' + park.attributes.FULLADDR);
                                  marker.openPopup();
                                  $('.leaflet-popup-close-button').click(function(){
                                    map.removeLayer(popup._popup);
                                  })
                                })
                                `*/
                                .addTo(map);
                            
                        }
                   });
