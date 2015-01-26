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
            twoPointBounds = {
                // bottomLeft: bottomLeft,
                // upperRight: upperRight
            },
            maxLat = bounds.getNorthEast().lat(),
            minLong = bounds.getNorthEast().lng(),
            minLat = bounds.getSouthWest().lat(),
            maxLong = bounds.getSouthWest().lng(),
            twoPointBounds = {
                bottomLeft: [maxLong, minLat],
                upperRight: [minLong, maxLat]
            },
            bounds = {
                'maxLat': maxLat,
                'minLong': minLong,
                'minLat': minLat,
                'maxLong': maxLong
            };
           // paramString = $.param(boundsArray);
            console.log('>>>>>>>>>>>>2 point Bounds')
            console.log(JSON.stringify(twoPointBounds))
             console.log('>>>>>>>>>>>> Bounds')
            console.log(JSON.stringify(bounds))
       // console.log('/markers' + paramString)
        //alert('/markers' + paramString)
        $.ajax('markers', twoPointBounds)
            .then(function (response) {
                console.log(response)
            },
            function (error) {
                console.log(error)
            })
    });
}


google.maps.event.addDomListener(window, 'load', initialize);