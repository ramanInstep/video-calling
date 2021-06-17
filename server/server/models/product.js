const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
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
    status: {
        type: Number,
        required: true
    },
    type: { type: String },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category'
    },
    createdAt: {
        type: Date,
        default: new Date()
    },
    isPopular: {
        type: Boolean,
        default: false
    },
});

module.exports = mongoose.model('Product', productSchema);

