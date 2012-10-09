var testUrl = 'http://services.arcgis.com/tNJpAOha4mODLkXz/ArcGIS/rest/services/Parks/FeatureServer/0/query';
var infoUrl = 'http://services.arcgis.com/tNJpAOha4mODLkXz/ArcGIS/rest/services/Parks/FeatureServer/2/query';
var feature_attributes = ['ADACOMPLY', 'BASKETBALL','BUSSTOP','COMGARDEN','EXERCISEFLD','FOOTBALL','HIKING','LIGHTING','OUTCANOE','PLAYGROUND','RESTROOM','SHOWER','SOCCER','TENNIS','BASEBALL','BOATING','CAMPING','DRINKWATER','FISHING','GOLFING','JOGGING','MTBCYCLE','PICIC','RECVEHICLE','SHADETREE','SKATEBOARD','SWIMMING','VOLLEYBALL'];


function parksCtrl($scope, $http) {
    $http.get('parks/init').success(function(data) {
        $scope.parks = data;
    });
};

function mapCtrl($scope, $http) {
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
            $scope.parks = data.features;
            $scope.current_park = data.features[0]; 
        })
        .error(function (e) {
            console.log(e);
        });

    $scope.counter = 0;

    $scope.center =  {
            lat: 21.460737,  // initial map center latitude
            lng: -157.9978180, // initial map center longitude
        };
    $scope.zoom = 10;

}

function optionsCtrl($scope, $http) {
    $http.get('/json/attributes.json').success( function(data) {
        $scope.opts = data.features;
    });

    $scope.current_tab = 'parks'; 
}
