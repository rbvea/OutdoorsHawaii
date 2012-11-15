var testUrl = 'http://services.arcgis.com/tNJpAOha4mODLkXz/ArcGIS/rest/services/Parks/FeatureServer/0/query';
var infoUrl = 'http://services.arcgis.com/tNJpAOha4mODLkXz/ArcGIS/rest/services/Parks/FeatureServer/2/query';
var feature_attributes = ['ADACOMPLY', 'BASKETBALL','BUSSTOP','COMGARDEN','EXERCISEFLD','FOOTBALL','HIKING','LIGHTING','OUTCANOE','PLAYGROUND','RESTROOM','SHOWER','SOCCER','TENNIS','BASEBALL','BOATING','CAMPING','DRINKWATER','FISHING','GOLFING','JOGGING','MTBCYCLE','PICIC','RECVEHICLE','SHADETREE','SKATEBOARD','SWIMMING','VOLLEYBALL'];


function parksCtrl($scope, $http) {
    $http.get('parks/init').success(function(data) {
        $scope.parks = data;
    });
};

function mapCtrl($scope, $http) {
    $scope.center =  {
            lat: 21.460737,  // initial map center latitude
            lng: -157.9978180, // initial map center longitude
    };
    $scope.zoom = 10;
    
    $scope.toggleActive = function(elem) {
        var toggle = angular.element("#group_"+elem)
        toggle.toggleClass('active');
    };
}

function optionsCtrl($scope, $http, $window, $compile) {

    $scope.promptFilter = function() {
        $http.get('filters').success(function(data) {
            angular.element.facebox($compile(data)($scope));
        });
    }

    $scope.promptFoursquare = function() {
        $http.get('/foursquare').success(function(data) {
            angular.element.facebox($compile(data)($scope));
        });
    };

    $http.get('/json/attributes.json').success( function(data) {
        $scope.opts = data.features;
    });
    
    $scope.filterFeature = function (option) {
        option.value = !option.value;
    };

    $scope.$watch('opts', function(changed, old) { 
        
    });

    $scope.isActive = function (option) {
        return (option.value) ? 'active' : ''; 
    };

    $scope.current_tab = 'parks'; 
}
