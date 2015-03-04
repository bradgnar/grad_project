var _ = require('lodash'),
	DEPTH_CLASS_SPREAD = 7,
	MAX_DEPTH_CLASS = 5;

var convert = {
	heatmap: function (data, minDepth) {
		return _.map(data, function (val) {
			return {
				_id: val._id,
				loc: val.loc,
				weight: val.WLDepth_ft < minDepth ? 1 : 0
			};
		});
	},
	depthClassification: function (data) {
		return _.map(data , function (val) {
			var depthMod = val.avgDepth % DEPTH_CLASS_SPREAD;
			val.depthClass = depthMod > MAX_DEPTH_CLASS ? 5 : depthMod;
			return val;
		});
	}
};

module.exports = convert;