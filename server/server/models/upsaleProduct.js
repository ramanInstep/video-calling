const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const upsaleProductSchema = new Schema({
    code: { type: String, required: "Code is required" },
    title: { type: String, required: "Title is required" },
    SKU: { type: String },
    description: { type: String },
    shortDescription: { type: String },
    price: { type: String },
    datasheet: { type: String },
    overview: { type: String },
    specification: { type: String },
    new: { type: Boolean },
    heroImage: { type: String },
    createdAt: {
        type: Date,
        default: new Date()
    }
});

module.exports = mongoose.model('UpsaleProduct', upsaleProductSchema);

