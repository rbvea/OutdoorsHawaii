/*for all tabs and checkboxes and hides or shows layers.*/
function update() {
    clear();
    var b =  document.getElementById("beaches").checked;
    var t =  document.getElementById("trails").checked;
    $('li').each(function(index) {
	if( $(this).hasClass("selected") ){
	    if(index == 0) {   //ALL	
		for(var i = 0; i < beaches.length; i++) {
		    if (b) {
			beaches[i].show();
		    } 
		    if (t) {
			trails[i].show();
		    } 
		}
		return;
	    } else  {  //SELECT
		if (b) {
		    beaches[index - 1].show();
		} 	
		if (t) {
		    trails[index - 1].show();
		} 
	    }
	}
    });
    findCenter();
}



function clear() {
    for(var i = 0; i < beaches.length; i++){
	beaches[i].hide();
	trails[i].hide();
    }
}


/* */
function toggle(obj) {
    $(obj).toggleClass("selected");
    if( $(obj).text() == "All Islands") {
	if($(obj).hasClass("selected")){
	    clear();
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
