function setOverlay(obj) {
    
}

function toggle(obj){
    $(obj).toggleClass("selected");

    var zoom = $(obj).text();

    //Switch on object text
    switch(zoom)
    {

    case "Oahu":
        map.setZoom(10);
        map.panTo(oahu);
        break;
    case "Kauai":
        map.setZoom(10);
        map.panTo(kauai);
        break;
    case "Molokai":
        map.setZoom(10);
        map.panTo(molokai);
        break;
    case "Lanai":
        map.setZoom(10);
        map.panTo(lanai);
        break;
    case "Maui":
        map.setZoom(10);
        map.panTo(maui);
        break;
    case "Big Island":
        map.setZoom(8);
        map.panTo(hawaii);
        break;
    case "All Islands":
        map.setZoom(7);
        map.panTo(center);
        break;
    }
}

function toggleOverlay(x) {
    var a, b;
    if (document.getElementsByName("beaches").checked) {
        trails[x].show();
    }
    else {
        trails[x].hide();
    }
    if (document.getElementsByName("trails").checked) {
        beaches[x].show()
    }
    else {
        beaches[x].hide();
    }
}

