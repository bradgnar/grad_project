var mongoose = require('mongoose'),
	db = mongoose.connection,
	Buoy = require('../models/buoy'),
    q = require('q');

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

    console.log('built query object')
    console.log(queryObj);

    Buoy.find(queryObj).exec(function (err, data) {
        console.log(Object.keys(data))
        res.json(data);
    });
}

