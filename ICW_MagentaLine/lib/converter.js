var _ = require('lodash');

var convert = {
	heatmap: function (data, minDepth) {
		return _.map(data, function (val) {
			return {
				_id: val._id,
				loc: val.loc,
				weight: val.WLDepth_ft < minDepth ? 1 : 0;
			};
		});
	}
};

module.exports = convert;