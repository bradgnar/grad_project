var mongoose = require('mongoose'),
    db = mongoose.connection,
    Schema = mongoose.Schema,
    soundingSchema = new Schema({
        loc: {
            type: [Number],
            index: '2dsphere'
        },
        WLDepth_ft: Number,
        StaticDraft: Number,
        Vessel: String,
        Date: String,
        Time: String
    }),
    Sounding = mongoose.model('proto_sound', soundingSchema);

module.exports = Sounding;