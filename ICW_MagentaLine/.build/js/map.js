//These are all borderline global variable because they need the scoping.
//They are mostly just configurations, save for the map
var map,
    iconString = "http://maps.google.com/mapfiles/ms/icons/",
    pngString = ".png",
    iconMap = {
        0: iconString + 'blue' + pngString,
        1: iconString + 'purple' + pngString,
        2: iconString + 'green' + pngString,
        3: iconString + 'orange' + pngString,
        4: iconString + 'yellow' + pngString,
        5: iconString + 'red' + pngString
    },
    defaultMapLat = 33.9,
    defaultMapLong = -78.38,
    defaultZoom = 12,
    URLS = {
        MARKERS: 'markers',
        HEAT_MAP: 'heatData',
        CLASSIFIED_MARKERS: 'classifiedMarkers'
    };


function initialize() {
    //semi global map ids and attribute object
    var markerArray = [],
    heatMapLayer,
    watchID
    geoOptions = {
        enableHighAccuracy: true, 
        maximumAge        : 60000, 
        timeout           : 27000
    };

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

/******************************************************************************
 * Map Events
 *****************************************************************************/
    google.maps.event.addListener(map, 'zoom_changed', function () {
        getMarkersFromDB(map);
    });

    google.maps.event.addListener(map, 'tilesloaded', function () {
        getMarkersFromDB(map);
    });

    // google.maps.event.addDomListener(document.getElementById('marker-classification'), 'click', function () {
    //     getMarkersFromDB(map);
    // });

    google.maps.event.addDomListener(document.getElementById('zoom-toggle'), 'click', zoomToggle);

    google.maps.event.addDomListener(document.getElementById('depth-finder-submit'), 'click', queryDepth);

    google.maps.event.addDomListener(document.getElementById('turn-on-geolocation'), 'click', checkForGeolocation);

    google.maps.event.addDomListener(document.getElementById('turn-off-geolocation'), 'click', dontUseGeolocation);
/******************************************************************************
 * End Map Events
 *****************************************************************************/

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
          watchId = navigator.geolocation.watchPosition(geoSuccess, geoError, geoOptions);
        } else {
          alert('Sorry geolocation is not available in your current navigator')
        }
    }

    function geoSuccess (position) {
        var config = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        };

        map.setOptions(setMapOptions(config));
        getMarkersFromDB(map);
        queryDepth();

    }

    function geoError (error) {
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
            watchId = undefined;
        }
    }
/******************************************************************************
 * End Geolocation functions
 ******************************************************************************/
/******************************************************************************
 * Depth and Heat map functions
 ******************************************************************************/
    function queryDepth () {
        var depthInput = $('#depth-finder-input'),
            depth = depthInput.val(),
            twoPointBounds = getViewportDimensions(map),
            params = {};

            params.depth = depth;
            params.bounds = twoPointBounds;

        if (!depth) {
            if (heatMapLayer) {
                removeHeatmapLayer();
            }
            return;
        } else {
            $.get(URLS.HEAT_MAP, params)
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

        $.get(URLS.CLASSIFIED_MARKERS, twoPointBounds)
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

    function createMarker (config) {
        var marker = new google.maps.Marker({
            position: config.location,
            map: map,
            title: '' + config.number,
            icon: config.icon
        });
    }

    function addMarker (marker) {
        markerArray.push(marker);
    }

    function createLocation (rawMarker) {
        return new google.maps.LatLng(rawMarker.loc[1], rawMarker.loc[0]);
    }


    function addAllMarkers (newMarkers) {
        _.forEach(newMarkers, function (marker) {
            addMarker(createMarker({
                location: createLocation(marker),
                number: marker.point_number,
                icon: iconMap[marker.depth_class]
            }));
        });
    }

    function updateMarkers (response) {
        console.log(response[1])
        deleteMarkers();
        addAllMarkers(response);

    }
/******************************************************************************
 * End of Marker functions
 ******************************************************************************/
}

function alertError (error) {
    console.log(error)
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

function isClassifiedOn (evt) {
    return evt ? $(evt.target || evt.srcElement).is(':checked') : $('#marker-classification').is(':checked');
}


//initialize map
google.maps.event.addDomListener(window, 'load', initialize);
