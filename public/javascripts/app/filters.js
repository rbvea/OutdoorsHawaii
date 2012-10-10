var filters = angular.module('outdoorshi.filters', []).
    filter('currentPark', function ($rootScope) {
        return function(park) {
            var active = '';
            if(angular.equals($rootScope.current_park, park)) {
                active += 'active';
            }
            return active;
        }
    });

