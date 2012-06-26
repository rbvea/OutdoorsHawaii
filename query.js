var map;
var beach_layer;
var trail_layer;

var center = new google.maps.LatLng(21.048400224902007, -157.37989649999997);
var oahu = new google.maps.LatLng(21.438912,-158.000056);
var kauai = new google.maps.LatLng(22.05891,-159.52698);
var molokai = new google.maps.LatLng(21.14439,-157.02263);
var lanai = new google.maps.LatLng(20.81660,-156.92732);
var maui = new google.maps.LatLng(20.79836,-156.33193);
var hawaii = new google.maps.LatLng(19.55461,-155.51147);

var beaches_data = new Array(6);
var trails_data = new Array(6);

var islands = new Array("kauai", "oahu", "molokai", "lanai", "maui", "hawaii");

function initialize() 
{
    showBeaches = document.getElementById("beaches").checked;
    showTrails = document.getElementById("trails").checked;
    var myOptions = {
        zoom: 10,
        mapTypeId: google.maps.MapTypeId.HYBRID
    };
 
    map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);

    beach_layer = query("beaches", islands);
    trail_layer = query("trails", islands);
    
}

function query(table, islands) {
    var query =  "SELECT * FROM " + table + " WHERE island='" + islands.join("' OR island='") + "'";
    var layer = new google.maps.CartoDBLayer(
    {	map_canvas: 'map_canvas',
	map: map,
	user_name:"outdoorshawaii",
	table_name: table,
	query: query,
	map_style: false,
	infowindow: false,
	auto_bound: true
    });
    return layer;
}

function updateLayers() {
    if (showBeaches) {
	beach_layer.update("SELECT * FROM beaches WHERE island='" + islands.join("' OR island ='") + "'");
	if (!beach_layer.isVisible) {
	    beach_layer.show();
	}
    }
    else if (beach_layer.isVisible) {
	beach_layer.hide();
    }
    if (showTrails) {
	trail_layer.update("SELECT * FROM trails WHERE island='" + islands.join("' OR island ='") + "'");
	if (!trail_layer.isVisible) {
	    trail_layer.show();
	}
    }
    else if (trail_layer.isVisible){
	trail_layer.hide();
    }

}