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
	}
};

module.exports = queryHelper;