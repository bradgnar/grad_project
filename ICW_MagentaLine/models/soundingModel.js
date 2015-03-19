var icwClient = require('../icw_client');

module.exports.getSoundings = function (queryData, callback) {
	icwClient.getSoudings(queryData, function (err, response) {
        if (err) {
            callback(err)
            return;
        }
        callback(undefined, response)
    });  
};

module.exports.getHeatMapData = function (queryData, callback) {
	console.log('souding model query data')
	console.log(JSON.stringify(queryData))
	icwClient.getHeatMapData(queryData, function (err, response) {
        if (err) {
            callback(err)
            return;
        }
        callback(undefined, response)
    }); 
};