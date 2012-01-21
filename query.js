var map;

var center = new google.maps.LatLng(21.048400224902007, -157.37989649999997);
var oahu = new google.maps.LatLng(21.438912,-158.000056);
var kauai = new google.maps.LatLng(22.05891,-159.52698);
var molokai = new google.maps.LatLng(21.14439,-157.02263);
var lanai = new google.maps.LatLng(20.81660,-156.92732);
var maui = new google.maps.LatLng(20.79836,-156.33193);
var hawaii = new google.maps.LatLng(19.55461,-155.51147);


var beaches = new Array(6);
var trails = new Array(6);

function initialize() 
{

    var isles = new Array("kauai", "oahu", "molokai", "lanai", "maui", "hawaii");
    var myOptions = {
        zoom: 10,
        mapTypeId: google.maps.MapTypeId.HYBRID
    };
    map = new google.maps.Map(document.getElementById("map_canvas"),
			      myOptions);

     for(var i = 0; i < isles.length; i++)  {
	var q =  "SELECT * FROM beaches WHERE island='" + isles[i] + "'";
	beaches[i] = new google.maps.CartoDBLayer({
	    map_canvas: 'map_canvas',
	    map: map,
	    user_name:"outdoorshawaii",
	    table_name: "beaches",
	    query: q,
	    map_style: false,
	    infowindow: false,
	    auto_bound: true
	});
    }

    for(var i = 0; i < isles.length; i++)  {
	var q =  "SELECT * FROM trails WHERE island='" + isles[i] + "'";
	trails[i] = new google.maps.CartoDBLayer({
	    map_canvas: 'map_canvas',
	    map: map,
	    user_name:"outdoorshawaii",
	    table_name: "trails",
	    query: q,
	    map_style: false,
	    infowindow: false,
	    auto_bound: true
	});
    }
}
