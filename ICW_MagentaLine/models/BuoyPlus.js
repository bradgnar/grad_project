var mongoose = require('mongoose'),
    db = mongoose.connection,
    Schema = mongoose.Schema,
    buoyPlusSchema = new Schema({
        loc: {
            type: [Number],
            index: '2dsphere'
        },
        point_number: Number,
        avg_depth: Number,
        number_of_soundings: Number,
        depth_class: Number
    }),
    BuoyPlus = mongoose.model('depth_buoy', buoyPlusSchema);

module.exports = BuoyPlus;