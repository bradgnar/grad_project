// var mongoose = require('mongoose'),
// 	db = mongoose.connection,
// 	Buoy = require('../models/buoy'),
//     BuoyPlus = require('../models/buoyPlus')
//     Sounding = require('../models/sounding'),
//     convert = require('../lib/converter'),
//     queryHelper = require('../lib/queryHelper'),
//     soundingDepth = 'WLDepth_ft',
var _ = require('lodash'),
    //icwClient = require('../lib/icw_client'),
    qs = require('querystring'),
    config = {
        host:'http://localhost:',
        port: 8001,
        serviceName: '/icw-service'
    },
    http = require('http'),
    request = require('request');

    // console.log('>>>>>>>>>keys for the icw client')
    // console.log(Object.keys())

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


function buildUrl (method, additionalUrl) {
    return config.host + config.port + config.serviceName + '/' + method  + '?' + additionalUrl;
}
