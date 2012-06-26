/* Checkbox variables */
var showBeaches;
var showTrails;

/* Removes and adds island names to the island array
   Adjusts the map's viewport
   Updates layer visibility based on selected checkboxes*/
function update() {
    showBeaches = document.getElementById("beaches").checked;
    showTrails = document.getElementById("trails").checked;
    $('li').each(function(index) {
	if ($(this).hasClass("selected")) {
	    if (index == 0) {
		islands = ["kauai", "oahu", "molokai", "lanai", "maui", "hawaii"];
		return false;	// Break out of $.each() loop
	    } else  {  //SELECT
		if ($.inArray($(this).attr("id"), islands) < 0) {
		    islands.push($(this).attr("id"));
		}
	    }
	}
	else {
	    if (index > 0) {
		if ($.inArray($(this).attr("id"), islands) > -1) {
		    islands.splice(islands.indexOf($(this).attr("id")), 1);
		} 
	    }
	}
    });
    updateLayers();
}

/* Controls the CSS for tabs */
function toggle(obj) {
    $(obj).toggleClass("selected");
    if( $(obj).text() == "All Islands") {
	if($(obj).hasClass("selected")){
	    $("li").each(function(i) {
		if(i != 0) {
		    $(this).removeClass("selected");
		}
	    });
	}
    } else {
	$('li').first().removeClass("selected");
    }
    update();
}
