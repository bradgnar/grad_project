'use strict';


var MapController = require('./map');


module.exports = function (router) {

	
	
    router.get('/map', function (req, res) {
        res.render('map', {});
    });

    router.get('/markers', MapController.getMarkers);

    router.get('/heatData', MapController.getDepthPointsForHeat);

    router.get('/soundings', MapController.getSoundings);

    router.get('/classifiedMarkers', MapController.getClassifiedMarkers);

};
