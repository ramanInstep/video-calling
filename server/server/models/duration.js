const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const durationSchema = new Schema({
    name: { type: String, required: "Title is required" },
});

module.exports = mongoose.model('Duration', durationSchema);

