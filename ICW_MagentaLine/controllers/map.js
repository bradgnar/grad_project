// var mongoose = require('mongoose'),
// 	db = mongoose.connection,
// 	Buoy = require('../models/buoy'),
//     BuoyPlus = require('../models/buoyPlus')
//     Sounding = require('../models/sounding'),
//     convert = require('../lib/converter'),
//     queryHelper = require('../lib/queryHelper'),
//     soundingDepth = 'WLDepth_ft',
var _ = require('lodash'),
    icwClient = require('../icw_client'),
    qs = require('querystring');

    console.log('>>>>>>>>>keys for the icw client')
    console.log(Object.keys(icwClient))

module.exports.getMarkers = function (req, res, next) {

    console.log('this is in the map controller for the magenta line site and this is the req.query')
    console.log(req.query)
    console.log(qs.stringify(req.query));
    icwClient.getMarkers(req.query, function (err, response) {
        if (err) {
            console.log('>>>>>there was an error')
            return;
        }
        console.log('>>>>>>>>> IN THE GET MARKERS CONtroLLER CALLBACK')
        console.log(response)
        res.json(response)
    });      
        // .then(function (response) {
        //     console.log('>>>>>>>>>>>>>>>>>>>>>>in the response promise')        
        //     ress.json(response)
        // },
        // function (err) {
        //     console.log('>>>>>>>>>>>>>>>>>>>in the error promise')
        //     res.json({'code': 'error'});
        // });
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

// module.exports.getClassifiedMarkers = function (req, res, next) {
//     var params = req.query,
//         queryObj,
//         MAX_DISTANCE = 5;

//     if (params) {
//         queryObj = queryHelper.boxQuery(params.bottomLeft, params.upperRight);
//     } else {
//         queryObj = {};
//     }

//     BuoyPlus.find(queryObj)
//         .exec(function (err, data) {
//             res.json(convert.depthClassification(data));
//         });
// }

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

