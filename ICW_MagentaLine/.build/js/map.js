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
            upperRightLat = bounds.getNorthEast().lat(),
            upperRightLong = bounds.getNorthEast().lng(),
            bottomLeftLat = bounds.getSouthWest().lat(),
            bottomLeftLong = bounds.getSouthWest().lng(),
            twoPointBounds = {
                bottomLeft: [bottomLeftLong, bottomLeftLat],
                upperRight: [upperRightLong, upperRightLat]
            };

            console.log('>>>>>>>>>>>>2 point Bounds')
            console.log(JSON.stringify(twoPointBounds))

        $.get('markers', twoPointBounds)
            .then(function (response) {
                console.log('>>>>>>>>response')
                console.log(response)
            },
            function (error) {
                console.log('.>>>>>>>>>>>>>errrrrrr')
                console.log(error)
            })
    });
}


google.maps.event.addDomListener(window, 'load', initialize);