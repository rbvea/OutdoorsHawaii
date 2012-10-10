var testUrl = 'http://services.arcgis.com/tNJpAOha4mODLkXz/ArcGIS/rest/services/Parks/FeatureServer/0/query';
var infoUrl = 'http://services.arcgis.com/tNJpAOha4mODLkXz/ArcGIS/rest/services/Parks/FeatureServer/2/query';

var directives = angular.module('outdoorshi.dirs', []).
    directive('leaflet', function($rootScope, $http) {
        return {
            restrict: 'E',
            template: '<div id="map" class="angular-leaflet-map"></div>',
            scope: false,
            replace: false, 
            require: mapCtrl,
            link: function(scope, iElement, iAttrs, controller) {
                var map = new L.Map('map', {
                    minZoom: 10,
                    center: new L.LatLng(scope.center.lat, scope.center.lng),
                    zoom: scope.zoom, 
                });

                var tile = L.tileLayer('http://{s}.tile.cloudmade.com/{key}/997/256/{z}/{x}/{y}.png', {
                    key: '02e10ae557e042ab9d012ef400178054',
                }).addTo(map);

                $rootScope.map = map;
                $rootScope.markers = [];

                $rootScope.$watch('current_park', function(old, changed) {
                    changed.marker.addTo($rootScope.map);
                });

                
                navigator.geolocation.getCurrentPosition(function(position) {
                    map.setView([position.coords.latitude , position.coords.longitude], 15);

                    var bounds = 0.02;
                    var geo = position.coords.longitude - bounds + ",";
                    geo +=  position.coords.latitude - bounds + ",";
                    geo +=  position.coords.longitude + bounds + ",";
                    geo +=  position.coords.latitude + bounds; 

                    var config = {
                        params: {
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
                            callback: 'JSON_CALLBACK',
                        },
                    };


                    $http.jsonp(testUrl, config)
                        .success(function(data) {
                            angular.forEach(data.features, function(park) {
                                park.marker = new L.marker([park.geometry.y, park.geometry.x]).addTo(map);
                            });
                            $rootScope.parks = data.features;
                        })
                        .error(function (e) {
                            console.log(e);
                        });
                });
            }
        }
    });

    
