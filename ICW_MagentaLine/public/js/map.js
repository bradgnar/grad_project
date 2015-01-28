function initialize() {
    var mapOptions = {
      center: { lat: 33.9, lng: -78.38},
      zoom: 10,
      mapTypeId: google.maps.MapTypeId.SATELLITE
    };
    var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions),
        markerArray = [];

    //functions to initialize data display
    //getMarkersFromDB(map);


    google.maps.event.addListener(map, 'zoom_changed', function () {
        getMarkersFromDB(map);
    });

    google.maps.event.addListener(map, 'tilesloaded', function () {
        getMarkersFromDB(map);
    });



    function getMarkersFromDB (map) {
        var twoPointBounds = getViewportDimensions(map);

        $.get('markers', twoPointBounds)
            .then(updateMarkers, alertMarkerError);
    }

    function setAllMap (map) {
        for (var i = 0; i < markerArray.length; i++) {
            markerArray[i].setMap(map);
        }
    }

    function clearMarkers () {
        setAllMap(null);
    }

    function showMarkers () {
        setAllMap(map);
    }

    function deleteMarkers () {
        clearMarkers();
        markerArray = [];
    }

    function addMarker (location, number) {
        var marker = new google.maps.Marker({
            position: location,
            map: map,
            title: '' + number
        });
        markerArray.push(marker);
    }

    function createLocation (rawMarker) {
        return new google.maps.LatLng(rawMarker.loc[1], rawMarker.loc[0]);
    }


    function addAllMarkers (newMarkers) {
        _.forEach(newMarkers, function (marker) {
            addMarker(createLocation(marker), marker.point_number);
        });
    }

    function updateMarkers (response) {
        deleteMarkers();
        addAllMarkers(response);

    }

    function alertMarkerError (error) {
        alert(error)
    }
}

function getViewportDimensions(map) {
    var bounds = map.getBounds(),
        upperRightLat = bounds.getNorthEast().lat(),
        upperRightLong = bounds.getNorthEast().lng(),
        bottomLeftLat = bounds.getSouthWest().lat(),
        bottomLeftLong = bounds.getSouthWest().lng(),
        twoPointBounds = {
            bottomLeft: [bottomLeftLong, bottomLeftLat],
            upperRight: [upperRightLong, upperRightLat]
        };

    return twoPointBounds;
}



google.maps.event.addDomListener(window, 'load', initialize);