var center =  new L.LatLng(21.460737,-157.997818);
var map;


function ParksCtrl($scope) {
   $scope.parks = [];
   $scope.addToMap = function(id, name, lng, lat) {
       $scope.parks.push({"id": id, "name" : name, "lng": lng, "lat": lat});
   }
}

function success(position) {

    var bounds = 0.02;

    var geo = "" + (position.coords.longitude - bounds) + ",";
    geo +=  position.coords.latitude - bounds + ",";
    geo +=  position.coords.longitude + bounds + ",";
    geo +=  position.coords.latitude + bounds;

    var testGet = $.get(testUrl, 
                        {
                            where : '1=1',
                            objectIds: null,
                            geometry: geo,
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
                            L.marker([position.coords.latitude, position.coords.longitude]).addTo(map).bindPopup("You are here!").openPopup();
                            console.log(parks);

                            for(var i in parks.features) {
                                var park = parks.features[i]; 
                                
                                var newItem = {"id": park.attributes.OBJECTID, "name": park.attributes.NAME, "lat": park.geometry.y, "lng": park.geometry.x};
                                
                                $scope.parks.push(newItem);

                                L.marker([park.geometry.y,park.geometry.x])
                                    .bindPopup('<div class="park_popup"/><h3>' + park.attributes.NAME + '</h3><p>' + park.attributes.FULLADDR)
                                    .addTo(map);
                            }
                        });



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


