const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = new Schema({
    title: { type: String, required: "Title is required" },
    type: { type: String },
    new: { type: Boolean },
    image: { type: String },
    parent: {
        type: Schema.Types.ObjectId,
        ref: 'Category'
    },
    order: {
        type: Number
    }
});

module.exports = mongoose.model('Category', categorySchema);

