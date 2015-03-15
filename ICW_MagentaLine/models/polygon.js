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

//NOTE: This is not finished
// { "type": "Feature",
//          "geometry": {
//            "type": {"Polygon",
//            "coordinates": [
//              [ [100.0, 0.0], [101.0, 0.0], [101.0, 1.0],
//                [100.0, 1.0], [100.0, 0.0] ]
//              ]
//          },
//          "properties": {
//            "prop0": "value0",
//            "prop1": {"this": "that"}
//            }
//          }


// {
//         loc: {
//             type: [Number],
//             index: '2dsphere'
//         },
//         WLDepth_ft: Number,
//         StaticDraft: Number,
//         Vessel: String,
//         Date: String,
//         Time: String
//     }