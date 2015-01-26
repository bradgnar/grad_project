var mongoose = require('mongoose'),
	db = mongoose.connection,
	Buoy = require('../models/buoy')

module.exports.getMarkers = function (req, res, next) {

    console.log('>>>>>>>>>>>>>>>>>>>>>>>req params')
    console.log(req.params)
    console.log(req.body)
    var params = req.params,
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

    Buoy.find(queryObj).exec();
}

