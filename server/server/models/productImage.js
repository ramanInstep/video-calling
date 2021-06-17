const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productImageSchema = new Schema({
    productId: {
        type: Schema.Types.ObjectId,
        ref: 'Product'
    },
    thumbnail: { type: String },
    large: { type: String },
});

module.exports = mongoose.model('ProductImage', productImageSchema);

