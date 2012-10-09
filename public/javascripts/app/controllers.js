var testUrl = 'http://services.arcgis.com/tNJpAOha4mODLkXz/ArcGIS/rest/services/Parks/FeatureServer/0/query';
var infoUrl = 'http://services.arcgis.com/tNJpAOha4mODLkXz/ArcGIS/rest/services/Parks/FeatureServer/2/query';
var feature_attributes = ['ADACOMPLY', 'BASKETBALL','BUSSTOP','COMGARDEN','EXERCISEFLD','FOOTBALL','HIKING','LIGHTING','OUTCANOE','PLAYGROUND','RESTROOM','SHOWER','SOCCER','TENNIS','BASEBALL','BOATING','CAMPING','DRINKWATER','FISHING','GOLFING','JOGGING','MTBCYCLE','PICIC','RECVEHICLE','SHADETREE','SKATEBOARD','SWIMMING','VOLLEYBALL'];

function mapCtrl($rootScope, $http) {
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
            angular.forEach(data.features, function(park) {
                park.marker = new L.marker([park.geometry.y, park.geometry.x]).addTo($rootScope.map);
            });

            $rootScope.parks = data.features;
            $rootScope.current_park = null;
        })
        .error(function (e) {
            console.log(e);
        });

    $rootScope.center =  {
            lat: 21.460737,  // initial map center latitude
            lng: -157.9978180, // initial map center longitude
        };

    $rootScope.zoom = 10;
}

function selectPark(park) {
    console.log(park);
}

function optionsCtrl($scope, $http) {
    $http.get('/json/attributes.json').success( function(data) {
        $scope.opts = data.features;
    });

    $scope.current_tab = 'parks'; 
}
