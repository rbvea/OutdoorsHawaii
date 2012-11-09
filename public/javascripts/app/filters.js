var filters = angular.module('outdoorshi.filters', []).
    filter('currentPark', function ($rootScope) {
        return function(park) {
            var active = '';
            if(angular.equals($rootScope.current_park, park)) {
                active += 'active';
            }
            return active;
        }
    }).
    filter('currentHike', function ($rootScope) {
        return function(hike) {
            var active = '';
            if(angular.equals($rootScope.current_hike, hike)) {
                active += 'active';
            }
            return active;
        }
    }).
    filter('filterByYes', function() {
        return function(features) {
            var features_avail = [];
            for(key in features) {
                if(features[key] == 'Yes') {
                    features_avail.push(key);
                }
            }
            return features_avail;
        };
    });


