//wanted a global map
var map,
    iconString = "http://maps.google.com/mapfiles/ms/icons/",
    pngString = ".png",
    iconMap = {
        0: iconString + 'blue' + pngString,
        1: iconString + 'purple' + pngString,
        2: iconString + 'red' + pngString,
        3: iconString + 'orange' + pngString,
        4: iconString + 'yellow' + pngString,
        5: iconString + 'green' + pngString
    },
    defaultMapLat = 33.9,
    defaultMapLong = -78.38,
    defaultZoom = 12;


function initialize() {
    //semi global map ids
    var markerArray = [],
    heatMapLayer,
    watchID;

    function setMapOptions (config) {
        var config = config || {};
        return {
            center: {
                lat: config.lat || defaultMapLat,
                lng: config.long || defaultMapLong
            },
            zoom: config.zoom || defaultZoom,
            mapTypeId: google.maps.MapTypeId.SATELLITE,
            zoomControl: isZoomTurnedOn(),
            scrollWheel: isZoomTurnedOn()
        }
    }

// key=AIzaSyBJBKlAPFj3pjrVtjKOS4u-mwqpfEkt5HQ
    map = new google.maps.Map(document.getElementById('map-canvas'), setMapOptions());

//Map events
    google.maps.event.addListener(map, 'zoom_changed', function () {
        getMarkersFromDB(map);
    });

    google.maps.event.addListener(map, 'tilesloaded', function () {
        getMarkersFromDB(map);
    });

    google.maps.event.addDomListener(document.getElementById('zoom-toggle'), 'click', zoomToggle);

    google.maps.event.addDomListener(document.getElementById('depth-finder-submit'), 'click', queryDepth);

    google.maps.event.addDomListener(document.getElementById('turn-on-geolocation'), 'click', checkForGeolocation);

    google.maps.event.addDomListener(document.getElementById('turn-off-geolocation'), 'click', dontUseGeolocation);

/******************************************************************************
 * Map Helper Functions
 *****************************************************************************/
    function zoomToggle(evt) {
        var mapDiv = $('#map-canvas');

        if (isZoomTurnedOn(evt)) {
            map.setOptions(setMapOptions());
            mapDiv.removeClass('scrollOff');
        } else {
            map.setOptions(setMapOptions());
            mapDiv.addClass('scrollOff');
        }
    }

    function setMapOptions (config) {
        var config = config || {};
        return {
            center: {
                lat: config.lat || defaultMapLat,
                lng: config.long || defaultMapLong
            },
            zoom: config.zoom || defaultZoom,
            mapTypeId: google.maps.MapTypeId.SATELLITE,
            zoomControl: isZoomTurnedOn(),
            scrollWheel: isZoomTurnedOn()
        }
    }
/******************************************************************************
 * End Map Helper Functions
 *****************************************************************************/

/******************************************************************************
 * Geolocation functions
 ******************************************************************************/

    function checkForGeolocation (success, error) {

        if ("geolocation" in navigator) {
          watchGeolocation();
        } else {
          alert('Sorry geolocation is not available in your current navigator')
        }
    }

    function watchGeolocation () {
        console.log('starting the geolocation watch');
        watchId = navigator.geolocation.watchPosition(function(position, error) {
            if (!error) {
                makeThePositonWatchUpdates(postion);
            } else {
                showGeolocationError(error);
            }
        });
    }

    function makeThePositionWatchUpdates (position) {
        var latitude = position.coords.latitude,
            longitude =  position.coords.longitude;


    }

    function showGeolocationError (error) {
        console.log(error.code);

        var geolocationErrorMap = {
            PERMISSION_DENIED: "User denied the request for Geolocation.",
            POSITION_UNAVAILABLE: "Location information is unavailable.",
            TIMEOUT: "The request to get user location timed out.",
            UNKNOWN_ERROR: "An unknown error occurred."

        };

        alert(geolocationErrorMap[error.code]);
    }

    function dontUseGeolocation () {
        if (watchId) {
            navigator.geolocation.clearWatch(watchID);
        }
    }
/******************************************************************************
 * End Geolocation functions
 ******************************************************************************/
/******************************************************************************
 * Depth and Heat map functions
 ******************************************************************************/
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
/******************************************************************************
 * End of Depth and Heat map functions
 ******************************************************************************/

/******************************************************************************
 * Marker functions
 ******************************************************************************/

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
/******************************************************************************
 * End of Marker functions
 ******************************************************************************/
}

function alertError (error) {
    alert(error);
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

 function isZoomTurnedOn (evt) {
    return evt ? $(evt.target || evt.srcElement).is(':checked') : $('#zoom-toggle').is(':checked');
}
//initialize map
google.maps.event.addDomListener(window, 'load', initialize);
