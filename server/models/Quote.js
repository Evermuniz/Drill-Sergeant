// set up Quote model to store the Drill Sergeant's quotes
const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const quoteSchema = new Schema({
  quoteText: {
    type: String,
  },
});

const Quote = model('Quote', quoteSchema);

module.exports = Quote;
