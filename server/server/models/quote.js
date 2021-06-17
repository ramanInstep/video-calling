const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const quoteSchema = new Schema({
    firstName: {
        type: String,
    },
    lastName: { type: String },
    company: { type: String },
    email: { type: String },
    role: { type: String },
    message: { type: String },
    subscribe: { type: Boolean },
    createdAt: {
        type: Date,
        default: new Date()
    }
});

module.exports = mongoose.model('Quote', quoteSchema);