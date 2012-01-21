function toggle(obj){
    $(obj).toggleClass("selected");
    if( $(obj).text() == "All Islands") {
	var fo =  document.getElementsByName("beaches").checked;
	var of =  document.getElementsByName("trails").checked;
	if (document.getElementsByName("beaches").checked) {
	    for (var i = 0; i < beaches.length; i++) {
		if (fo) {
		    beaches[i].show();
		} else {
		    beaches[i].hide();
		}
	    }
	    
	    if (document.getElementsByName("trails").checked) {
		for (var i = 0; i < trails.length; i++) {
		    if (fo) {
			trails[i].show();
		    } else {
			trails[i].hide();
		    }
		}
	    }
	}
	else {
	    $("#islands .tabs").each(function(i, checked) {
		if( $(checked).hasClass("selected")) {
		    if(document.getElementsByName("beaches").checked) {
			beaches[i].show();
		    }
		    if(document.getElementsByName("trails").checked) {
			trails[i].show();
		    }
		} else {
		    beaches[i].hide();
		    trails[i].hide();
		}
	    });
	}
    }
