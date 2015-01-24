'use strict';


var BuoyController = require('./buoys'),
    SoundingController = require('./soundings');


module.exports = function (router) {


    router.get('/', function (req, res) {

        res.render('map', {});

    });

    // router.get('/markers', function (req, res) {
    //     //BuoyController.getMarkers
    // });

};
