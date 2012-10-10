var feature_attributes = ['ADACOMPLY', 'BASKETBALL','BUSSTOP','COMGARDEN','EXERCISEFLD','FOOTBALL','HIKING','LIGHTING','OUTCANOE','PLAYGROUND','RESTROOM','SHOWER','SOCCER','TENNIS','BASEBALL','BOATING','CAMPING','DRINKWATER','FISHING','GOLFING','JOGGING','MTBCYCLE','PICIC','RECVEHICLE','SHADETREE','SKATEBOARD','SWIMMING','VOLLEYBALL'];

function mapCtrl($rootScope, $http) {
    
    if(navigator.geolocation) {
        }, function() {
            console.log('error');
        });
    }


    $rootScope.center =  {
            lat: 21.460737,  // initial map center latitude
            lng: -157.9978180, // initial map center longitude
        };

    $rootScope.zoom = 10;
    
    $rootScope.selectPark = function(park) {
        $rootScope.current_park = park;
    }

}

function optionsCtrl($scope, $http) {
    $http.get('/json/attributes.json').success( function(data) {
        $scope.opts = data.features;
    });

    $scope.current_tab = 'parks'; 
}
