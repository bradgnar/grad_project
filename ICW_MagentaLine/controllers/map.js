var mongoose = require('mongoose'),
	db = mongoose.connection,
	Buoy = require('../models/buoy'),
    Sounding = require('../models/sounding'),
    convert = require('../lib/converter');

module.exports.getMarkers = function (req, res, next) {

    var params = req.query,
        queryObj;

    if (params) {
        queryObj = {
            'loc': {
             '$geoWithin': {
                '$box': [
                    params.bottomLeft ,
                    params.upperRight
                ]
             }
          }
        };
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
        queryObj = {
            'loc': {
             '$geoWithin': {
                '$box': [
                    params.bounds.bottomLeft ,
                    params.bounds.upperRight
                ]
             }
          }
        };
    }

    Sounding.find(queryObj)
        .where('WLDepth_ft').lt(params.depth)
        .exec(function (err, data) {
            res.json(data)
        });
}

module.exports.getDepthPointsForHeat = function (req, res, next) {

    var params = req.query,
        queryObj;

    if (params) {
        queryObj = {
            'loc': {
             '$geoWithin': {
                '$box': [
                    params.bounds.bottomLeft ,
                    params.bounds.upperRight
                ]
             }
          }
        };
    }

    Sounding.find(queryObj)
        .exec(function (err, data) {
            res.json(convert.heatmap(data, params.depth));
        });
}

