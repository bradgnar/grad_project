var qs = require('querystring'),
    config = {
        host:'http://localhost:',
        port: 8001,
        serviceName: '/icw-service'
    },
    request = require('request');

module.exports.getMarkers = function (data, callback) {
    
    var querystring = qs.stringify(data),
    url = buildUrl('markers', querystring);

    request.get(url, function (err, res) {
        if (!err) {
            callback(undefined, res.body)
        } else {
            callback(err)
        }
    });
};

module.exports.getSoundings = function (data, callback) {

    var queryObj = {
            upperRightLong: data.bounds.upperRight[0],
            upperRightLat: data.bounds.upperRight[1],
            bottomLeftLong: data.bounds.bottomLeft[0],
            bottomLeftLat: data.bounds.bottomLeft[1]
        },
        querystring = qs.stringify(queryObj),
        url = buildUrl('soundings', querystring);

    request.get(url, function (err, res) {
        if (!err) {
            callback(undefined, res.body)
        } else {
            callback(err)
        }
    });
}

module.exports.getClassifiedMarkers = function (data, callback) {

    var querystring = qs.stringify(data),
    url = buildUrl('classifiedMarkers', querystring);

    request.get(url, function (err, res) {
        if (!err) {
            callback(undefined, res.body)
        } else {
            callback(err)
        }
    });
}

module.exports.getHeatMapData = function (data, callback) {

    var queryObj = {
            depth: data.depth,
            upperRightLong: data.bounds.upperRight[0],
            upperRightLat: data.bounds.upperRight[1],
            bottomLeftLong: data.bounds.bottomLeft[0],
            bottomLeftLat: data.bounds.bottomLeft[1]
        },
        querystring = qs.stringify(queryObj),
        url = buildUrl('heatData', querystring);

        request.get(url, function (err, res) {
            if (!err) {
                callback(undefined, res.body)
            } else {
                callback(err)
            }
        });
}


function buildUrl (method, additionalUrl) {
    return config.host + config.port + config.serviceName + '/' + method  + '?' + additionalUrl;
}
