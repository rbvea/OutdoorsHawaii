var overlay = new Array(2);
var view = new Array(6);


overlay[0] = beaches;
overlay[1] = trails;

var query=  new google.maps.CartoDBLayer({
    map_canvas: 'map_canvas',
    map: map,
    user_name:"outdoorshawaii",
    table_name: 'TABLE_NAME',
    query: "SELECT * FROM TABLE_NAME",
    map_style: true,
    infowindow: true,
    auto_bound: true
});