var mongoose = require('mongoose'),
	db = mongoose.connection,
	Buoy = require('../models/buoy'),
    BuoyPlus = require('../models/buoyPlus')
    Sounding = require('../models/sounding'),
    convert = require('../lib/converter'),
    queryHelper = require('../lib/queryHelper'),
    soundingDepth = 'WLDepth_ft',
    _ = require('lodash');

module.exports.getMarkers = function (req, res, next) {

    var params = req.query,
        queryObj;

        console.log('in get markers')

    if (params) {
        queryObj = queryHelper.boxQuery(params.bottomLeft, params.upperRight);
    } else {
        queryObj = {};
    }

    Buoy.find(queryObj).exec(function (err, data) {
        console .log('int eh find as well' +   data)
        res.json(data);
    });
}

module.exports.getSoundings = function (req, res, next) {

    var params = req.query,
        queryObj;

    if (params) {
        queryObj = queryHelper.boxQuery(params.bounds.bottomLeft, params.bounds.upperRight);
    }

    Sounding.find(queryObj)
        .exec(function (err, data) {
            res.json(data)
        });
}

module.exports.getClassifiedMarkers = function (req, res, next) {
    var params = req.query,
        queryObj,
        MAX_DISTANCE = 5;

    if (params) {
        queryObj = queryHelper.boxQuery(params.bottomLeft, params.upperRight);
    } else {
        queryObj = {};
    }

    BuoyPlus.find(queryObj)
        .exec(function (err, data) {
            res.json(convert.depthClassification(data));
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