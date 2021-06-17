const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const relatedProductSchema = new Schema({
    productId: { type: Schema.Types.ObjectId, ref:'Product' },
    relatedProductId: { type: Schema.Types.ObjectId }
});

module.exports = mongoose.model('RelatedProduct', relatedProductSchema);

