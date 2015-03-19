var Promise = require('bluebird'),
    MarkerModel = require('../models/markerModel'),
    SoundingModel = require('../models/soundingModel');

module.exports.getMarkers = function (req, res, next) {
    var getMarkers = Promise.promisify(MarkerModel.getMarkers);

    getMarkers(req.query)
        .then(function (response) {
            res.json(JSON.parse(response))
        }, function (err) {
            res.json(JSON.parse(err.message))
        });    
};

module.exports.getSoundings = function (req, res, next) {

    var getSoundings = Promise.promisify(SoundingModel.getSoundings);

    getSoundings(req.query)
        .then(function (response) {
            res.json(JSON.parse(response));
        }, function (err) {
            res.json(JSON.parse(err.message));
        });
};

module.exports.getClassifiedMarkers = function (req, res, next) {

    var getClassifiedMarkers = Promise.promisify(MarkerModel.getClassifiedMarkers);

    getClassifiedMarkers(req.query)
        .then(function (response) {
            res.json(JSON.parse(response));
        }, function (err) {
            res.json(JSON.parse(err.message));
        });
};

module.exports.getDepthPointsForHeat = function (req, res, next) {

    var getHeatMapData = Promise.promisify(SoundingModel.getHeatMapData);
    
    getHeatMapData(req.query)
        .then(function (response) {
            res.json(JSON.parse(response));
        }, function (err) {
            res.json(err.message);
        });
};

