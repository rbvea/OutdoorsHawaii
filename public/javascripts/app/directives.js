var parksUrl = 'http://services.arcgis.com/tNJpAOha4mODLkXz/ArcGIS/rest/services/Parks/FeatureServer/0/query';
var infoUrl = 'http://services.arcgis.com/tNJpAOha4mODLkXz/ArcGIS/rest/services/Parks/FeatureServer/2/query';
var hikesUrl = 'http://services.arcgis.com/tNJpAOha4mODLkXz/ArcGIS/rest/services/Hiking_Trails_Oahu/FeatureServer/0/query';

var directives = angular.module('outdoorshi.dirs', []);

directives.directive('leaflet', function($rootScope, $http, $compile) {
    return {
        restrict: 'E',
        template: '<div id="map" class="angular-leaflet-map"></div>',
        scope: false,
        replace: true, 
        require: mapCtrl,
        link: function(scope, iElement, iAttrs, controller) {

            var map = new L.Map('map', {
                minZoom: 10,
                center: new L.LatLng(scope.center.lat, scope.center.lng),
                zoom: scope.zoom, 
                crs: L.CRS.EPSG4326,
            });

            var tile = L.tileLayer('http://{s}.tile.cloudmade.com/{key}/997/256/{z}/{x}/{y}.png', {
                key: '02e10ae557e042ab9d012ef400178054',
            }).addTo(map);

            $rootScope.map = map;
            $rootScope.markers = [];

            $rootScope.$watch('current_park', function(changed) {
                if(changed.geometry != undefined){
                    $rootScope.map.panTo([changed.geometry.y, changed.geometry.x]);
                    //var output = '<h3>Address: '+park.attributes.FULLADDR+'</h3';
                    changed.marker.bindPopup('<h4>'+changed.attributes.FULLADDR+'</h4>');
                    changed.marker.openPopup();
                    //changed.marker.openPopup();
                }
            });

            $rootScope.selectPark = function(park) {
                $rootScope.current_park = park;
                $http.jsonp(infoUrl, {
                    params : {
                        where : 'FACILITYID='+park.attributes.FACILITYID,
                        objectIds: null,
                        outFields: '*',
                        returnIdsOnly: false,
                        returnCountOnly: false,
                        orderByFields: null,
                        groupByFieldsForStatistics: null,
                        f: 'json',
                        token: null,
                        callback: 'JSON_CALLBACK',
                    }
                })
                .success(function (data) {
                    angular.forEach(data.features, function (park) {
                        $rootScope.current_park_features = park.attributes;
                        $compile('<dl><dd ng-repeat="feature in current_park_features | filterByYes">{{feature}}</dd></dl>')($rootScope, function(elem, scope) {
                            angular.element(scope.current_park.marker._popup._wrapper).append(elem[0]);
                        });
                        
                    });
                })
                .error(function () {
                    console.log('whoops, an error happened.')
                });
            };

            navigator.geolocation.getCurrentPosition(function(position) {
                $rootScope.position = position;

                $rootScope.map.setView([position.coords.latitude, position.coords.longitude], 14);

                var bounds = 0.02;
                var geo = position.coords.longitude - bounds + ",";
                geo +=  position.coords.latitude - bounds + ",";
                geo +=  position.coords.longitude + bounds + ",";
                geo +=  position.coords.latitude + bounds; 

                var config = {
                    params: {
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
                        callback: 'JSON_CALLBACK',
                    },
                };
                /*
                $http.jsonp(parksUrl, config)
                    .success(function(data) {
                        angular.forEach(data.features, function(park) {
                            park.marker = new L.marker([park.geometry.y, park.geometry.x]).addTo(map);
                            park.marker.on("click", function(e) {
                                $rootScope.selectPark(park);
                                $rootScope.$apply();
                            });
                        });
                        $rootScope.parks = data.features;
                        $rootScope.current_park = null;
                    })
                    .error(function (e) {
                        console.log(e);
                    });*/
                $http.jsonp(hikesUrl, config)
                     .success(function(data) {
                         var test_hike = data.features[0];
                         //console.log(test_hike.geometry.paths[0]);
                         angular.forEach(test_hike.geometry.paths[0], function(hike) {
                             var latlng = hike;
                             hike = new L.LatLng(latlng[0], latlng[1]);
                         });
                         var polyline = new L.Polyline(test_hike.geometry.paths[0]).addTo(map);
                         console.log(polyline);
                     })
                     .error(function (e) {
                         consoel.log(e);
                     });
            },function() {
                //handle all parks
            });
        }
    }
});
