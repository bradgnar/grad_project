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
        host:'http://localhost',
        port: 8001,
        serviceName: '/icw-service'
    },
    http = require('http'),
    request = require('request');

    // console.log('>>>>>>>>>keys for the icw client')
    // console.log(Object.keys())

module.exports.getMarkers = function (data, callback) {
    var dataString = JSON.stringify(data);
    querystring = qs.stringify(data);

    console.log('>>>>>>>>>this is the query string')
    console.log(querystring)

    request.get("http://localhost:8001/icw-service/markers?" + querystring, function (err, res) {
        if (!err) {
            //var resultsObj = JSON.parse(body);
            //Just an example of how to access properties:
            console.log(res.body)
            //console.log(resultsObj);
            callback(undefined, res.body)
        } else {
            console.log(err.message)
        }
    });

//     var options = {
//       host: config.host,
//       port: 8001,
//       path: config.serviceName + '?' + qs.stringify(dataString),
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json; charset=utf-8',
//         'Content-Length': dataString.length 
//       }
//     };

// var req = http.request(options, function(res) {
//   var msg = '';

//   res.setEncoding('utf8');
//   req.on('error', function(e) {
//       console.log('problem with request: ' + e.message);
//     });
//   res.on('data', function(chunk) {
//     msg += chunk;
//   });
//   res.on('end', function() {
//     console.log(JSON.parse(msg));
//   });
// });

// req.write(data);
// req.end();
}

// module.exports.getMarkers = function (bounds, callback) {
//     var query = '/markers?' + qs.stringify(bounds),
//         url = buildUrl(query);
// console.log('this is the url for the thingy')
// console.log(url)

//         // http.get(url, function (err, response) {
//         //     if (err || !response || response.statusCode < 200 || response.statusCode >= 300) {
//         //         console.log(JSON.stringify(err))
//         //         callback(err);
//         //         return;
//         //     }

//         //     callback(undefined, response);
//         // });
//     // var params = req.query,
//     //     queryObj;



//     // if (params) {
//     //     queryObj = queryHelper.boxQuery(params.bottomLeft, params.upperRight);
//     // } else {
//     //     queryObj = {};
//     // }

//     // icwClient.getMarkers(queryObj)
//     //     .then(function (response) {
//     //         console.log('>>>>>>>>>>>>>>>>>>>>>>in the response')        
//     //         res.json(response)
//     //     },
//     //     function (err) {
//     //         console.log('>>>>>>>>>>>>>>>>>>>in the error')
//     //     })
// };

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

function buildUrl (additonalUrl) {
    return config.host + config.port + config.serviceName + additionalUrl;
}
