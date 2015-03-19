var _ = require('lodash'),
    qs = require('querystring'),
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

    var querystring = qs.stringify(data),
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

    console.log(">>>>>>>>>>this is the url")

    request.get(url, function (err, res) {
        if (!err) {
            callback(undefined, res.body)
        } else {
            callback(err)
        }
    });
}

module.exports.getHeatMapData = function (data, callback) {

    var querystring = qs.stringify(data),
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
