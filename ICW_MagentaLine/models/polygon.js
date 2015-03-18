var mongoose = require('mongoose'),
    db = mongoose.connection,
    Schema = mongoose.Schema,
    polygonSchema = new Schema({
        type: { type: String, default: "Feature"},
        geometry: {
            type: { type: String, default: "Polygon"},
            coordinates: [[Number]]
        }
    }),
    Polygon = mongoose.model('polygon', polygonSchema);

module.exports = Polygon;
