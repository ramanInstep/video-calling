const mongoose = require('mongoose');

const { Schema } = mongoose;

const licenseSchema = new Schema({
  name: { type: String },
  required: { type: Boolean },
  url: { type: String },
  description: { type: String },
  type: { type: String },
  order: { type: Number },
  price: { type: Number },
  tooltipDescription:  { type: String },

});

module.exports = mongoose.model('License', licenseSchema);
