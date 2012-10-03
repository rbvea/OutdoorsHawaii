function initLocation(lat, lng, $scope) {
    $scope.lat = lat;
    $scope.lng = lng;
}

function parksCtrl($scope, $http) {
    $http.get('parks/init').success(function(data) {
        $scope.parks = data;
    });
};

var feature_attributes = [{"key": "ADACOMPLY", "name" : "Disabilty Friendly"},{"name" : "Basketball", "key" : "BASKETBALL", "value" : true },{"name":"Bus Stop Near" , "key" : "BUSSTOP", "value" : true}, {"name" : "Community Garden" , "key" : "COMGARDEN", "value" : true },{"name" : "Exercise Equipment" , "key" :"EXERCISEFLD", "value" : true },{"name" : "Football" , "key" :"FOOTBALL", "value" : true },{"name" : "Hiking" , "key" :"HIKING", "value" : true },{"name" : "Night Lighting Available" , "key" :"LIGHTING", "value" : true },{"name" : "Canoes Permitted" , "key" :"OUTCANOE", "value" : true },{"name" : "Children's Playground" , "key" :"PLAYGROUND" , "value" : true },{"name" : "Public Restrooms","key" :"RESTROOM", "value" : true },{"name" : "Public Showers" , "key" :"SHOWER", "value" : true },{"name" : "Soccer Field" , "key" :"SOCCER", "value" : true },{"name" : "Tennis Courts" , "key" :"TENNIS", "value" : true },{"name" : "Baseball Fields" , "key" :"BASEBALL", "value" : true} , {"name":"Boating Permitted" , "key":"BOATING", "value" : true },{"name":"Campsites" , "key":"CAMPING","value": true },{"name" : "Potable Water" , "key" :"DRINKWATER", "value" : true },{"name" : "Fishing" , "key" :"FISHING", "value" : true },{"name" : "Golf Courses" ,"key" :"GOLFING", "value" : true },{"name" : "Good for Jogging" , "key" :"JOGGING", "value" : true },{"name" : "Motorcycles Permitted" , "key" :"MTBCYCLE", "value" : true },{"name": "Picnic",  "key" :"PICNIC", "value" : true },{"name" : "Offroad Vehicles Permitted" , "key" :"RECVEHICLE", "value" : true },{"name" : "Lots of Shade",  "key" :"SHADETREE", "value" : true },{"name" : "Skateboarding Permitted" , "key" :"SKATEBOARD", "value" : true },{"name" : "Swimming Pools" , "key" :"SWIMMING" , "value" : true},{"name" : "Volleyball Courts" , "key" :"VOLLEYBALL", "value" : true}];

function optionsCtrl($rootScope) {
    $rootScope.opts = feature_attributes;
}

function pushBody(view) {
    window.splitViewNavigator.pushBodyView(view);
}
