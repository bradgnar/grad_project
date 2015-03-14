var _ = require('lodash'),
	DEPTH_CLASS_SPREAD = 6,
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
			var depthLevel = val.avgDepth / DEPTH_CLASS_SPREAD;
			val.depthClass = depthLevel > MAX_DEPTH_CLASS ? MAX_DEPTH_CLASS : depthLevel;
			return val;
		});
	}
};

module.exports = convert;