var _ = require('lodash'),
    icwClient = require('../icw_client');

module.exports.getMarkers = function (queryData, callback) {
    icwClient.getMarkers(queryData, function (err, response) {
        if (err) {
            callback(err)
            return;
        }
        callback(undefined, response)
    });      
};

module.exports.getClassifiedMarkers = function (queryData, callback) {
    icwClient.getClassifiedMarkers(queryData, function (err, response) {
        if (err) {
            callback(err);
            return;
        }
        callback(undefined, response)
    });
};