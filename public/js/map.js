//var Firebase = new Firebase('http://gamma.firebase.com/rbvea/');
var center =  new L.LatLng(21.460737,-157.997818);
var map;
var testUrl = 'http://services.arcgis.com/tNJpAOha4mODLkXz/ArcGIS/rest/services/Parks/FeatureServer/0/query';
var infoUrl = 'http://services.arcgis.com/tNJpAOha4mODLkXz/ArcGIS/rest/services/Parks/FeatureServer/2/query';
var parks = [];
var feature_attributes = ['ADACOMPLY', 'BASKETBALL','BUSSTOP','COMGARDEN','EXERCISEFLD','FOOTBALL','HIKING','LIGHTING','OUTCANOE','PLAYGROUND','RESTROOM','SHOWER','SOCCER','TENNIS','BASEBALL','BOATING','CAMPING','DRINKWATER','FISHING','GOLFING','JOGGING','MTBCYCLE','PICNIC','RECVEHICLE','SHADETREE','SKATEBOARD','SWIMMING','VOLLEYBALL'];


function initMap() {
    var SW = new L.LatLng(21.25, -158.23);
    var NE = new L.LatLng(21.7, -157.65);

    var bounds = new L.LatLngBounds(SW, NE);

    map = new L.Map('map', {
        minZoom: 8,
        center: center, 
        zoom:    10, 
    });
}

function getInfo(id, name) {
    $.get(infoUrl, 
          {
              where : 'FACILITYID=' + id,
              objectIds: null,
              outFields: '*',
              returnIdsOnly: false,
              returnCountOnly: false,
              orderByFields: null,
              groupByFieldsForStatistics: null,
              outStatistics: null,
              f: 'json',
              token: null,
          },function(data) {
              var sidebarview = '<h4>FEATURES</h4>';
              sidebarview += '<ul id="parks-sidebar">';
              
              var info = $.parseJSON(data);
              for(i in feature_attributes) {
                  if(info.features[0].attributes[feature_attributes[i]] == "Yes") {
                      sidebarview += '<li>';
                      sidebarview += '<img class="feature-pic" src="/img/icons/' + feature_attributes[i] + '.svg"/>'; 
                      sidebarview += feature_attributes[i].toLowerCase();
                      sidebarview += '</li>';
                  }
              }
              sidebarview += '</ul>';
              pushSidebarView({
                  title: name,
                  backLabel: null, 
                  view: $(sidebarview),
              });
          });
}

function filterFields(field) {
    
}


function pushSidebarView(view) {
    window.splitViewNavigator.pushSidebarView(view);
}

function openPopup(id) {
    for(i in parks) {
        if(parks[i].id == id) {
            var park = parks[i];
            break;
        }
    }

    var marker = parks[i].attr.marker;
            
    if(! marker.hasOwnProperty('_map')) {
        marker.addTo(map);
        park.attr.marker_id = marker._leaflet_id;
    }
    marker.openPopup();
    console.log(park.id);
    getInfo(park.id, park.attr.name);
}

function init(parksData, placeMarkers) {
    var $sidebar = "";
    $sidebar += '<ul id="parks-sidebar">'

/*
    L.tileLayer('http://{s}.tile.cloudmade.com/{key}/997/256/{z}/{x}/{y}.png', {
        key: '02e10ae557e042ab9d012ef400178054',
    }).addTo(map);*/
    
   $(map.getPanes().tilePane).css('z-index', -1);

    for(var i in parksData.features) {
        var park = parksData.features[i];

        var marker = new L.marker([park.geometry.y,park.geometry.x])
            .bindPopup("<h3>" + park.attributes.NAME + "</h3><p>" + park.attributes.FULLADDR + "</p>");
        
        if (placeMarkers) { 
            marker.addTo(map);
        }


        var thispark = 
            {
                id: park.attributes.FACILITYID,
                attr: 
                {
                    name: park.attributes.NAME,
                    marker_id: marker._leaflet_id,
                    marker: marker,
                },
            };

        $sidebar += '<li onclick="openPopup('+thispark.id+');">'+thispark.attr.name+ '</li>';
        parks.push(thispark);
    
        marker.on("click", function () {
            $sidebar = "";
            var park;

            for(i in parks) {
                if(parks[i].attr.marker_id == this._leaflet_id) {
                    park = parks[i];
                    break;
                }
            }
            if(park != null) {
                getInfo(park.id, park.attr.name);
            }
        });
        
    }
    map.on('popupclose', function () { 
        window.splitViewNavigator.popSidebarView();
    });

    $sidebar += '</ul>';
    
    window.splitViewNavigator.replaceSidebarView({
        title: 'Outdoors Hawaii',
        backLabel: null,
        view : $($sidebar),
    });
    var esriLayer = new L.TileLayer.ESRI("http://services.arcgisonline.com/ArcGIS/rest/services/NatGeo_World_Map/MapServer", {zIndex: 0});
    map.addLayer(esriLayer, true);
}

function success(position, $scope) {
    var bounds = 0.02;

    var geo = position.coords.longitude - bounds + ",";
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
              initMap();
              init($.parseJSON(data), false);
              //L.marker([position.coords.latitude, position.coords.longitude]).addTo(map).bindPopup("You are here!").openPopup(); 
              map.panTo(new L.LatLng(position.coords.latitude, position.coords.longitude));
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
              initMap();
              init($.parseJSON(data), false);
          });
}

if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(success, error);
} else {
    error();
}

$(document).ready(function () {
    new SplitViewNavigator('body', "Menu");
    window.splitViewNavigator.pushSidebarView({
        title: 'Parks',
        backLabel: null,
        view: '<h3>Loading...</h3>'
    });
    window.splitViewNavigator.pushBodyView({
        title: 'Outdoors Hawaii', 
        backLabel: null,
        view: '<div id="map"></div>',
    });
});
