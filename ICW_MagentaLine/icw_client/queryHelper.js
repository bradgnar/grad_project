var queryHelper = {
	boxQuery: function (bottomLeft, upperRight) {
		return {
            'loc': {
             '$geoWithin': {
                '$box': [
                    bottomLeft,
                    upperRight
                ]
             }
          }
        };
	},
    nearQuery: function (longitude, latitude, maxDistance) {
        return {
            'loc': {
                '$nearSphere': {
                    '$geometry': {
                        'type' : "Point",
                        'coordinates' : [ longitude, latitude ]
                     },
                     '$maxDistance': maxDistance
                }
            }
        };
    }
};

module.exports = queryHelper;