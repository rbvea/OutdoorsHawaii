var directives = angular.module('outdoorshi.dirs', []).
    directive('leaflet', function() {
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
                });

                /*
                var tile = L.tileLayer('http://{s}.tile.cloudmade.com/{key}/997/256/{z}/{x}/{y}.png', {
                    key: '02e10ae557e042ab9d012ef400178054',
                }).addTo(map);*/

                scope.$parent.map = map;
            },
        };
    });




