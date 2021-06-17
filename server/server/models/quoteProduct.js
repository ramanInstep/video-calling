const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const quoteProudctSchema = new Schema({
    productId: {
        type: Schema.Types.ObjectId,
        ref: 'Product'
    },
    quoteId: {
        type: Schema.Types.ObjectId,
        ref: 'Quote'
    },
    quantity: { type: Number },
    total: { type: Number },
    enterpriceLicense:{
        type: Schema.Types.ObjectId,
        ref:'License'
    },
    mvSenseLicense:{
        type: Schema.Types.ObjectId,
        ref:'License'
    },
    cloudLicense:{
        type: Schema.Types.ObjectId,
        ref:'License'
    },
   
    createdAt: {
        type: Date,
        default: new Date()
    }
});

module.exports = mongoose.model('QuoteProduct', quoteProudctSchema);