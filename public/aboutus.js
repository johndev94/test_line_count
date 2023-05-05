$("document").ready(function(){

    var map = L.map("map").setView([54.950869, -7.723349], 12);

    
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    var marker = L.marker([54.950869, -7.723349]).addTo(map);
    marker.bindPopup("<b>Hello! We're Cinema Sol</b>");

});