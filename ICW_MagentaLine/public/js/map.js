function initialize() {
    var mapOptions = {
      center: { lat: 33.9, lng: -78.38},
      zoom: 10,
      mapTypeId: google.maps.MapTypeId.SATELLITE
    };
    var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
}

//you can do a media query with the CSS to get this effect
//no need for the JS
// function detectBrowser() {
//     var useragent = navigator.userAgent;
//     var mapdiv = document.getElementById("map-canvas");

//     if (useragent.indexOf('iPhone') != -1 || useragent.indexOf('Android') != -1 ) {
//         mapdiv.style.width = '100%';
//         mapdiv.style.height = '100%';
//     } else {
//         mapdiv.style.width = '600px';
//         mapdiv.style.height = '800px';
//     }
// }
google.maps.event.addDomListener(window, 'load', initialize);