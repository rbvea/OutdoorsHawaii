var center =  new L.LatLng(21.460737,-157.997818);
var map;
var parksJSON;
var testUrl = 'http://services.arcgis.com/tNJpAOha4mODLkXz/ArcGIS/rest/services/Parks/FeatureServer/0/query';
var parksData;
var parks = [];


function initMap() {
    var SW = new L.LatLng(21.25, -158.23);
    var NE = new L.LatLng(21.7, -157.65);

    var bounds = new L.LatLngBounds(SW, NE);

    map = new L.Map('contentRoot', {
        minZoom: 8,
        center: center, 
        zoom:    10, 
    });

    var esriLayer = new L.TileLayer.ESRI("http://services.arcgisonline.com/ArcGIS/rest/services/NatGeo_World_Map/MapServer")
    map.addLayer(esriLayer);
}

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
              var $sidebar = "";
              initMap();
              
              parksData = $.parseJSON(data);
              
              $sidebar += '<ul class="unstyled">'
              for(var i in parksData.features) {
                  var park = parksData.features[i];
                  
                  $sidebar += '<li onclick="get_park('+park.attributes.OBJECTID+')">'+park.attributes.NAME+ '</li>';

                  L.marker([park.geometry.y,park.geometry.x])
                      .bindPopup("<h3>" + park.attributes.NAME + "</h3><p>" + park.attributes.FULLADDR + "</p>")
                      .addTo(map);
              }
              $sidebar += '</ul>';
              
              window.splitViewNavigator.pushSidebarView({
                  title: 'Outdoors Hawaii',
                  backLabel: null,
                  view : $($sidebar)
                  
              });
              L.marker([position.coords.latitude, position.coords.longitude]).addTo(map).bindPopup("You are here!").openPopup(); map.panTo(new L.LatLng(position.coords.latitude, position.coords.longitude));
              map.setZoom(13);
          });


}

function error() {

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
              parksData = $.parseJSON(data);

              for(var i in parksData.features) {
                  var park = parksData.features[i];
                  
                  $('#parks-sidebar').append('<div class="accordion-group"><div class="accordion-heading"><a class="accordion-toggle category" data-toggle="collapse" data-parent="#parks-sidebar" href="#' + name_short + '">' + park.attributes.NAME + '</a></div><div id="' + name_short + '" class="accordion-body collapse"><div class="accorion-inner">foo</div></div></div>');

                  L.marker([park.geometry.y,park.geometry.x]).bindPopup("<h3>" + park.attributes.NAME + "</h3><p>" + park.attributes.FULLADDR + "</p>")
                      .addTo(map);
              }

          });
}

if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(success, error);
} 


$(document).ready(function () {
    new SplitViewNavigator('body', "Menu");
    window.splitViewNavigator.pushSidebarView(
        {title: 'Parks',
         backLabel: null,
         view: '<h3>Loading...'});
    window.splitViewNavigator.pushBodyView({
        title: 'Outdoors Hawaii', 
        backLabel: null,
        view: '<div class="loading" style="margin-left: 5px;"></div>',
    });
});
