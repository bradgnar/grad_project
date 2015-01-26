function initialize() {
    var mapOptions = {
      center: { lat: 33.9, lng: -78.38},
      zoom: 10,
      mapTypeId: google.maps.MapTypeId.SATELLITE
    };
    var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

    alert('dsfawf')

    google.maps.event.addListener(map, 'zoom_changed', function () {
        var bounds = map.getBounds(),
            maxLat = bounds.getNorthEast().lat(),
            minLong = bounds.getNorthEast().lng(),
            minLat = bounds.getSouthWest().lat(),
            maxLong = bounds.getSouthWest().lng(),
            boundsArray = [
                {name: 'maxLat', value: maxLat},
                {name: 'minLong', value: minLong},
                {name: 'minLat', value: minLat},
                {name: 'maxLong', value: maxLong}
            ],
            paramString = $.param(boundsArray);
       // console.log('/markers' + paramString)
        alert('/markers' + paramString)
    });
}


google.maps.event.addDomListener(window, 'load', initialize);