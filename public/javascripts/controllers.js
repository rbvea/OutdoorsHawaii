function initLocation(lat, lng, $scope) {
    $scope.lat = lat;
    $scope.lng = lng;
}

function parksCtrl($scope, $http) {
    $http.get('parks/init').success(function(data) {
        $scope.parks = data;
    });
};


function optionsCtrl($scope, $http) {
    $http.get('/json/attributes.json').success( function(data) {
        console.log(data);
        $scope.opts = data;
    });
}

function pushBody(view) {
    window.splitViewNavigator.pushBodyView(view);
}
