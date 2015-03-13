var mongoose = require('mongoose'),
	db = mongoose.connection,
	Buoy = require('../models/buoy'),
    Sounding = require('../models/sounding'),
    convert = require('../lib/converter'),
    queryHelper = require('../lib/queryHelper'),
    soundingDepth = 'WLDepth_ft';

module.exports.getMarkers = function (req, res, next) {

    var params = req.query,
        queryObj;

    if (params) {
        queryObj = queryHelper.boxQuery(params.bottomLeft, params.upperRight);
    } else {
        queryObj = {};
    }

    Buoy.find(queryObj).exec(function (err, data) {
        res.json(data);
    });
}

module.exports.getDepthPoints = function (req, res, next) {

    var params = req.query,
        queryObj;

    if (params) {
        queryObj = queryHelper.boxQuery(params.bounds.bottomLeft, params.bounds.upperRight);
    }

    Sounding.find(queryObj)
        .where(soundingDepth).lt(params.depth)
        .exec(function (err, data) {
            res.json(data)
        });
}

module.exports.getClassifiedDepthPoints = function (req, res, next) {
    var params = req.query,
        queryObj;

    if (params) {
        queryObj = queryHelper.boxQuery(params.bottomLeft, params.upperRight);
    } else {
        queryObj = {};
    }

    Buoy.find(queryObj).exec(function (err, data) {
        res.json(data);
    });
}

module.exports.getDepthPointsForHeat = function (req, res, next) {

    var params = req.query,
        queryObj;

    if (params) {
        queryObj = queryHelper.boxQuery(params.bounds.bottomLeft, params.bounds.upperRight);
    }

    Sounding.find(queryObj)    
        .where(soundingDepth).lt(params.depth)
        .exec(function (err, data) {
            res.json(convert.heatmap(data, params.depth));
        });
}

