'use strict';


var MapController = require('./map');


module.exports = function (router) {


    router.get('/map', function (req, res) {

        res.render('map', {});

    });

    router.get('/markers', function (req, res, next) {
        res.json(MapController.getMarkers(req, res, next));
    });

    // router.get('/markers', function (req, res) {
    //     //BuoyController.getMarkers
    // });

};
