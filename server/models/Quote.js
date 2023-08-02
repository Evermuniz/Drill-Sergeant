const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const quoteSchema = new Schema({
  quoteText: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp),
  },
});

const Quote = model('Quote', quoteSchema);

module.exports = Quote;
