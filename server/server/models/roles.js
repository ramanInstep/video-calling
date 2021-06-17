const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const roleSchema = new Schema({
    title: { type: String, required: "Title is required" },
    order: {
        type: Number
    }
});

module.exports = mongoose.model('Role', roleSchema);

