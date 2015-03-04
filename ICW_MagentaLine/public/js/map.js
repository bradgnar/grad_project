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
    },
    markerArray = [],
    heatMapLayer;

// key=AIzaSyBJBKlAPFj3pjrVtjKOS4u-mwqpfEkt5HQ
    map = new google.maps.Map(document.getElementById('map-canvas'), notZoomable);

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
                .then(makeHeatMap, alertError);
        }
    }

    function makeHeatMap (response) {
        //first remove the marker so that you can 
        alert('here')
        console.log(JSON.stringify(response))
        //deleteMarkers();
        if (heatMapLayer) {
            removeHeatmapLayer();
        }
    
        var heatMapData = _.map(response, function (val) {
            return {
                location: new google.maps.LatLng(val.loc[1], val.loc[0]),
                weight: val.weight
            };
        });

        heatMapLayer = new google.maps.visualization.HeatmapLayer({
            data: heatMapData
        });

        heatMapLayer.setMap(map);
    }

    function removeHeatmapLayer () {
        heatMapLayer.setMap(null);
        heatMapLayer = null;
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
