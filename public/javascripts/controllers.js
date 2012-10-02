angular.module('outhi',[]);

function initLocation(lat, lng, $scope) {
    $scope.lat = lat;
    $scope.lng = lng;
}

function parksCtrl($scope, $http) {
    console.log('asldkfj');
    $http.get('parks/init').success(function(data) {
        $scope.parks = data;
    });
}

var feature_attributes = ['ADACOMPLY', 'BASKETBALL','BUSSTOP','COMGARDEN','EXERCISEFLD','FOOTBALL','HIKING','LIGHTING','OUTCANOE','PLAYGROUND','RESTROOM','SHOWER','SOCCER','TENNIS','BASEBALL','BOATING','CAMPING','DRINKWATER','FISHING','GOLFING','JOGGING','MTBCYCLE','PICIC','RECVEHICLE','SHADETREE','SKATEBOARD','SWIMMING','VOLLEYBALL'];

function optionsCtrl($scope) {
    $scope.options = [
        {"name":"bah"},
        {"name":"baz"},
    ];
}
