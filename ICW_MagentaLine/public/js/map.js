//wanted a global map
var map;

function initialize() {
    var notZoomable = {
      center: { lat: 33.9, lng: -78.38},
      zoom: 10,
      mapTypeId: google.maps.MapTypeId.SATELLITE,
      zoomControl: false,
      scrollWheel: false
    },
    zoomable = {
        center: { lat: 33.9, lng: -78.38},
          zoom: 10,
          mapTypeId: google.maps.MapTypeId.SATELLITE,
          zoomControl: true
    };


    map = new google.maps.Map(document.getElementById('map-canvas'), notZoomable),
        markerArray = [];

//Map events
    google.maps.event.addListener(map, 'zoom_changed', function () {
        getMarkersFromDB(map);
    });

    google.maps.event.addListener(map, 'tilesloaded', function () {
        getMarkersFromDB(map);
    });

    google.maps.event.addDomListener(document.getElementById('zoom-toggle'), 'click', zoomToggle);

    google.maps.event.addDomListener(document.getElementById('depth-finder-submit'), 'click', queryDepth);

    function queryDepth (evt) {
        var depthSubmit = $(evt.target || evt.srcElement),
            depthInput = $('#depth-finder-input'),
            depth = depthInput.val(),
            twoPointBounds = getViewportDimensions(map),
            params = {};

            params.depth = depth;
            params.bounds = twoPointBounds;

        if (depth) {
            $.get('depth', params)
                .then(updateDepthLayer, alertError);
        }
    }

    function updateDepthLayer (data) {
        console.log(JSON.stringify(data));
    }

//enables zooming
    function zoomToggle(evt) {
        var zoom = $(evt.target || evt.srcElement),
            mapDiv = $('#map-canvas');

        if (zoom.prop('checked')) {
            map.setOptions(zoomable);
            mapDiv.removeClass('scrollOff');
        } else {
            map.setOptions(notZoomable);
            mapDiv.addClass('scrollOff');
        }
    }

    function getMarkersFromDB (map) {
        var twoPointBounds = getViewportDimensions(map);

        $.get('markers', twoPointBounds)
            .then(updateMarkers, alertError);
    }

    function setAllMap (map) {
        for (var i = 0; i < markerArray.length; i++) {
            markerArray[i].setMap(map);
        }
    }

    function clearMarkers () {
        setAllMap(null);
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

    function alertError (error) {
        alert(error);
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


//initialize map
google.maps.event.addDomListener(window, 'load', initialize);

//initialize anything else that I didnt want to clutter map stuff with
$(document).ready(function () {

    //http://stackoverflow.com/questions/469357/html-text-input-allow-only-numeric-input
    //#thanks bro
    $('.numbers-only').keydown(function (e) {
        // Allow: backspace, delete, tab, escape, enter and .
        if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
             // Allow: Ctrl+A
            (e.keyCode == 65 && e.ctrlKey === true) ||
             // Allow: home, end, left, right
            (e.keyCode >= 35 && e.keyCode <= 39)) {
                 // let it happen, don't do anything
                 return;
        }
        // Ensure that it is a number and stop the keypress
        if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
            e.preventDefault();
        }
    });

    $('#depth-finder-info').popover({
        html: true,
        content: 'Use this to check the channel to see if there are any places where your boat cannot pass, this should be the <strong>minimum depth</strong> necessary for your boat to travel safely.'
    });


})