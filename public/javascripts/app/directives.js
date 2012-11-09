var parksUrl = 'http://services.arcgis.com/tNJpAOha4mODLkXz/ArcGIS/rest/services/Parks/FeatureServer/0/query';
var infoUrl = 'http://services.arcgis.com/tNJpAOha4mODLkXz/ArcGIS/rest/services/Parks/FeatureServer/2/query';
var hikesUrl = 'http://services.arcgis.com/tNJpAOha4mODLkXz/ArcGIS/rest/services/Hiking_Trails_Oahu/FeatureServer/0/query';
var directives = angular.module('outdoorshi.dirs', []);

directives.directive('leaflet', function($rootScope, $http, $compile, $window) {
    return {
        restrict: 'E',
        template: '<div id="map" class="angular-leaflet-map"></div>',
        scope: false,
        replace: true, 
        require: mapCtrl,
        link: function(scope, iElement, iAttrs, controller) {

            angular.element("#map").css('height', angular.element(window).height() - 77);
            var width = angular.element(window).width();
            angular.element("#map").css('width', (width < 767) ? width :  width - (width / 4));

            var map = new L.Map('map', {
                minZoom: 10,
                center: new L.LatLng(scope.center.lat, scope.center.lng),
                zoom: scope.zoom, 
            });

            var tile = L.tileLayer('http://{s}.tile.cloudmade.com/{key}/997/256/{z}/{x}/{y}.png', {
                key: '02e10ae557e042ab9d012ef400178054',
            }).addTo(map);

            $rootScope.height = angular.element(window).height();

            angular.element(window).resize(function() {
                var width = angular.element(window).width();
                angular.element("#map").css('width', (width < 767) ? width :  width - (width / 4));
                $rootScope.map.invalidateSize(true);
            });

            $rootScope.map = map;
            $rootScope.markers = [];

            window.onorientationchange = function () {
                var width = angular.element(window).width();
                var height = angular.element(window).height();

                angular.element("#map").css('width', (width < 767) ? width :  width - (width / 4));
                angular.element("#map").css('height', height); 
                angular.element("#parks-nav").css('height', height);
                angular.element("#options-nav").css('height', height); 
                $rootScope.map.invalidateSize(true);
            };

            $rootScope.$watch('current_park', function(changed) {
                if(changed.geometry != undefined){
                    $rootScope.map.panTo([changed.geometry.y, changed.geometry.x]);
                    //var output = '<h3>Address: '+park.attributes.FULLADDR+'</h3';
                    changed.marker.bindPopup('<h4>'+changed.attributes.FULLADDR+'</h4>');
                    changed.marker.openPopup();
                    //changed.marker.openPopup();
                }
            });

            $rootScope.selectHike = function(hike) {
                hike.line.openPopup(); 
                $rootScope.current_hike = hike;
            }

           $rootScope.init = function (park, index) {
               park.index = index;
           } 

            $rootScope.selectPark = function(park, nav) {
                $rootScope.current_park = park;
                if(!nav) {
                    angular.element("#parks-nav").scrollTop(angular.element("#park_"+park.index).position().top);
                };
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
                        orderByFields: 'MUNICIPALITY', 
                        groupByFieldsForStatistics: null,
                        outStatistics: null,
                        f: 'json',
                        token: null, 
                        callback: 'JSON_CALLBACK',
                    },
                };
                $http.jsonp(parksUrl, config)
                    .success(function(data) {

                        $rootScope.grouped_parks = {
                            Aiea: [],
                            Ewa: [],
                            Ewa_Beach: [],
                            Haleiwa: [],
                            Honolulu: [],
                            Kaaawa: [],
                            Kahuku: [],
                            Kailua: [],
                            Kaneohe: [],
                            Kapolei: [],
                            Laie: [],
                            Mililani: [],
                            Pearl_City: [],
                            Wahiawa: [],
                            Waialua: [],
                            Waianae: [],
                            Waimanalo: [],
                            Waipahu: [],
                            Waipio: [],
                        };

                        angular.forEach(data.features, function(park) {
                            park.marker = new L.marker([park.geometry.y, park.geometry.x]);
                            park.marker.on("click", function(e) {
                                $rootScope.selectPark(park, false);
                                $rootScope.$apply();
                            });
                            if(park.attributes.MUNICIPALITY != null && $rootScope.grouped_parks[park.attributes.MUNICIPALITY.trim()] != undefined) {
                                $rootScope.grouped_parks[park.attributes.MUNICIPALITY.trim()].push(park.marker);
                            }
                        });

                        angular.forEach($rootScope.grouped_parks, function (group) {
                            var cluster = new L.MarkerClusterGroup();
                            angular.forEach(group, function(marker) {
                                cluster.addLayer(marker);
                            });
                            $rootScope.map.addLayer(cluster);
                        });
                        $rootScope.parks = data.features;
                        $rootScope.current_park = null;
                    })
                    .error(function (e) {
                        console.log(e);
                    });
                $http.jsonp(hikesUrl, config)
                     .success(function(data) {
                         angular.forEach(data.features, function(hike) {
                             $rootScope.hikes = data.features;
                             var latlngs = [];
                             angular.forEach(hike.geometry.paths, function(path) {
                                 angular.forEach(path, function(plot) {
                                     var latlng = plot; 
                                     latlngs.push(new L.LatLng(plot[1], plot[0]));
                                 });
                                 var polyline = new L.Polyline(latlngs).addTo(map);
                                 hike.line = polyline;
                                 polyline.bindPopup("<h1>"+hike.attributes.TRAILNAME+"</h1>");
                                 polyline.on("click", function(e) {
                                     polyline.openPopup();
                                     $rootScope.selectHike(hike);
                                     //map.fitBounds(new L.LatLngBounds(polyline._latlngs[0], polyline._latlngs[polyline._latlngs.length - 1]));
                                 });
                             });
                         });
                     })
                     .error(function (e) {
                         console.log(e);
                     });
            },function() {
                //handle all parks
            });
        }
    }
});
