//     BuoyPlus = require('../models/buoyPlus')
//     Sounding = require('../models/sounding'),
//     convert = require('../lib/converter'),
//     queryHelper = require('../lib/queryHelper'),
//     soundingDepth = 'WLDepth_ft',
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