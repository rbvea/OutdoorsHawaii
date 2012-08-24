var center =  new L.LatLng(21.460737,-157.997818);
var map;
var parksJSON;
var testUrl = 'http://services.arcgis.com/tNJpAOha4mODLkXz/ArcGIS/rest/services/Parks/FeatureServer/0/query';
var parksData;
var parks = [];


function success(position, $scope) {
    var bounds = 0.02;

    var geo = "" + (position.coords.longitude - bounds) + ",";
    geo +=  position.coords.latitude - bounds + ",";
    geo +=  position.coords.longitude + bounds + ",";
    geo +=  position.coords.latitude + bounds;

    $.get(testUrl, 
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
              parksData = $.parseJSON(data);
              
              for(var i in parksData.features) {
                  var park = parksData.features[i];
                  var name_short = park.attributes.NAME.split(" ")[0];
                  
                  $('#parks-sidebar').append('<div class="accordion-group"><div class="accordion-heading"><a class="accordion-toggle category" data-toggle="collapse" data-parent="#parks-sidebar" href="#' + name_short + '">' + park.attributes.NAME + '</a></div><div id="' + name_short + '" class="accordion-body collapse"><div class="accorion-inner">foo</div></div></div>');


                  parks.push({"object": park, "marker":
                              L.marker([park.geometry.y,park.geometry.x]).bindPopup("<h3>" + park.attributes.NAME + "</h3><p>" + park.attributes.FULLADDR + "</p>")
                              .addTo(map)
                              .on('click', 
                                  function() { 
                                      console.log(this._popup._content)
                                  })
                             });
              }

              $('#Hans').collapse();

          });

    L.marker([position.coords.latitude, position.coords.longitude]).addTo(map).bindPopup("You are here!").openPopup(); map.panTo(new L.LatLng(position.coords.latitude, position.coords.longitude));
    map.setZoom(13);

}

function error() {

    $.get(testUrl,
          {
              where : '1=1',
              objectIds: null,
              geometry: null
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
              parksData = $.parseJSON(data);

              for(var i in parksData.features) {
                  var park = parksData.features[i];

                  $('#parks-sidebar').append('<div class="accordion-group"><div class="accordion-heading"><a class="accordion-toggle category" data-toggle="collapse" data-parent="#parks-sidebar" href="#' + name_short + '">' + park.attributes.NAME + '</a></div><div id="' \
+ name_short + '" class="accordion-body collapse"><div class="accorion-inner">foo</div></div></div>');

                  L.marker([park.geometry.y,park.geometry.x]).bindPopup("<h3>" + park.attributes.NAME + "</h3><p>" + park.attributes.FULLADDR + "</p>")
                      .addTo(map);
              }

          });
}

if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(success, error);
} 


$(document).ready(function() {


    $('#parks-sidebar li').click(function() {
        console.log(this);
    });

});

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



