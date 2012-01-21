var map;

var center = new google.maps.LatLng(21.048400224902007, -157.37989649999997);
var oahu = new google.maps.LatLng(21.438912,-158.000056);
var kauai = new google.maps.LatLng(22.05891,-159.52698);
var molokai = new google.maps.LatLng(21.14439,-157.02263);
var lanai = new google.maps.LatLng(20.81660,-156.92732);
var maui = new google.maps.LatLng(20.79836,-156.33193);
var hawaii = new google.maps.LatLng(19.55461,-155.51147);

var islands = new Array("oahu", "kauai"); 

var overlay = new Array("beaches", "trails"); 
var view = new Array(2);

function foo() {
  var x = google.maps.mapTypeId.HYBRID;
  alert(x);
}

function initialize() 
{

        var myOptions = {
		center: new google.maps.LatLng(21.438912,-158.000056),
          zoom: 10,
          mapTypeId: google.maps.MapTypeId.HYBRID
        };
        map = new google.maps.Map(document.getElementById("map_canvas"),
            myOptions);

    for(var v = 0; v < overlay.length; v++) {
	for(var i = 0; i < view.length; i++)  {
	    var q =  "SELECT * FROM " + overlay[v] + " WHERE island='" + islands[i] + "'";
	    $("body").append(overlay[v] + " " + islands[i]);

	    this.view[i] = new google.maps.CartoDBLayer({
		map_canvas: 'map_canvas',
		map: map,
		user_name:"outdoorshawaii",
		table_name: overlay[v],
		query: q,
		map_style: false,
		infowindow: true,
		auto_bound: true
	    });
	}
    }
}
