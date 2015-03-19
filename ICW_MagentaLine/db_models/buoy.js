var mongoose = require('mongoose'),
    db = mongoose.connection,
    Schema = mongoose.Schema,
    buoySchema = new Schema({
        loc: {
            type: [Number],
            index: '2dsphere'
        },
        pointNumber: Number
    }),
    Buoy = mongoose.model('buoy', buoySchema);

module.exports = Buoy;