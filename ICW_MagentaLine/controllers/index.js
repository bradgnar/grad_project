'use strict';


var MapController = require('./map');


module.exports = function (router) {


    router.get('/map', function (req, res) {

        res.render('map', {});

    });

    router.get('/markers', function (req, res, next) {
        console.log('>>>>>>>>>>>>>>>hit the route');
        console.log(req.body)
        //console.log(req)
        console.log(req.params)
        MapController.getMarkers(req, res, next)
        res.json();
    });

    // router.get('/markers', function (req, res) {
    //     //BuoyController.getMarkers
    // });

};
