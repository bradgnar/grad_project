var _ = require('lodash'),
    icwClient = require('../icw_client'),
    qs = require('querystring'),
    Promise = require('bluebird'),
    MarkerModel = require('../models/markerModel');

module.exports.getMarkers = function (req, res, next) {
    var getMarkers = Promise.promisify(MarkerModel.getMarkers);

    getMarkers(req.query)
        .then(function (response) {
            res.json(JSON.parse(response))
        }, function (err) {
            res.json(JSON.parse(err.message))
        });    
};

// module.exports.getSoundings = function (req, res, next) {

//     var params = req.query,
//         queryObj;

//     if (params) {
//         queryObj = queryHelper.boxQuery(params.bounds.bottomLeft, params.bounds.upperRight);
//     }

//     Sounding.find(queryObj)
//         .exec(function (err, data) {
//             res.json(data)
//         });
// }

module.exports.getClassifiedMarkers = function (req, res, next) {

    var getClassifiedMarkers = Promise.promisify(MarkerModel.getClassifiedMarkers);

    getClassifiedMarkers(req.query)
        .then(function (response) {
            res.json(JSON.parse(response));
        }, function (err) {
            res.json(JSON.parse(err.message));
        })

    // var params = req.query,
    //     queryObj,
    //     MAX_DISTANCE = 5;

    // if (params) {
    //     queryObj = queryHelper.boxQuery(params.bottomLeft, params.upperRight);
    // } else {
    //     queryObj = {};
    // }

    // BuoyPlus.find(queryObj)
    //     .exec(function (err, data) {
    //         res.json(convert.depthClassification(data));
    //     });
}

// module.exports.getDepthPointsForHeat = function (req, res, next) {

//     var params = req.query,
//         queryObj;

//     if (params) {
//         queryObj = queryHelper.boxQuery(params.bounds.bottomLeft, params.bounds.upperRight);
//     }

//     Sounding.find(queryObj)    
//         .where(soundingDepth).lt(params.depth)
//         .exec(function (err, data) {
//             res.json(convert.heatmap(data, params.depth));
//         });
// }

