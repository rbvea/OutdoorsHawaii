function toggle(obj) {
    $(obj).toggleClass("selected");
    var b =  document.getElementById("beaches").checked;
    var t =  document.getElementById("trails").checked;
    if( $(obj).text() == "All Islands") {
        for (var i = 0; i < beaches.length; i++) {
            if (b) {
                beaches[i].show();
            }
            else {
                beaches[i].hide();
            }
            if (t) {
                trails[i].show();
            }
            else {
                trails[i].hide();
            }
        }
        $("#islands .tabs")..each(function(i, checked) {
            alert(checked);
            //$(checked).removeClass("selected");
        });
    }
    else {
        $("#islands .tabs").each(function(i, checked) {
            if( $(checked).hasClass("selected")) {
                if(document.getElementById("beaches").checked) {
                    beaches[i].show();
                }
                if(document.getElementById("trails").checked) {
                    trails[i].show();
                }
            } else {
                beaches[i].hide();
                trails[i].hide();
            }
        });
    }
}
