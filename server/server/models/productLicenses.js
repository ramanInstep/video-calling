const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productLicensesSchema = new Schema({
    productId: {
        type: Schema.Types.ObjectId,
        ref: 'Product'
    },
    licenseId: {
        type: Schema.Types.ObjectId,
        ref: 'License'
    }
});

module.exports = mongoose.model('ProductLicenses', productLicensesSchema);

