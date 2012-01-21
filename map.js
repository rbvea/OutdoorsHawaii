//west to east: kauai, oahu, molokai, lanai, maui, hawaii
//var longitudes = ["-159.52698" ,"-158.000056", "-157.02263", "-156.92732", "-156.33193", "-155.51147"];
//var latitudes = ["22.05891", "21.438912"

function island(latitude, longitude)
{
this.latitude = latitude;
this.longitude = longitude;
}

//island coordinates
kauai_c = new island(22.05891,-159.52698);
oahu_c = new island(21.438912,-158.000056);
molokai_c = new island(21.14439,-157.02263);
lanai_c = new island(20.81660,-156.92732);
maui_c = new island(20.79836,-156.33193);
hawaii_c = new island(19.55461,-155.51147);

var islandcoords = [kauai_c, oahu_c, molokai_c, lanai_c, maui_c, hawaii_c];


function findCenter() {
	var i = 0;
	var minlat = 0;
	var maxlat = 0;
	var minlong = 0;
	var maxlong = 0;
	var count = 0;
	var templat = 0;
	var templong = 0;
	$('li').each(function(index) {
		if (index > 0) {
			if ($(this).hasClass("selected")) {
				if(index == 1) {
					minlat = islandcoords[index - 1].latitude;
					maxlat = minlat;
					minlong = islandcoords[index - 1].longitude;
					maxlong = minlong;
				}
				else {
					templat = islandcoords[index - 1].latitude;
					templong = islandcoords[index - 1].longitude;
					if(templat < minlat) {
						minlat = templat;
					}
					else if(templat > maxlat) {
						maxlat = templat;
					}
					if(templong < minlong) {
						minlong = templong;
					}
					else if(templong > maxlong) {
						maxlong = templong;
					}
				}
				count++;
			}
		}
	});
	
	if (count == 0) {
		middle = new google.maps.LatLng(21.048400224902007, -157.37989649999997);
	}
	else {
		middle = new google.maps.LatLng((minlat + maxlat)/2, (minlong + maxlong)/2);
	}

	var longdif = maxlong - minlong;
	//var latdif = maxlat - minlat;
	
	if(longdif > 2) {
		map.setZoom(7);
	}
	else if(longdif > 1) {
		map.setZoom(8);
	}
	else {
		map.setZoom(10);
	}
	map.panTo(middle);
} //end findcenter
	