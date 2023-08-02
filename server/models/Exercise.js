const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const exerciseSchema = new Schema({
    name: {
        type: String,
    },
    type: {
        type: String,
    },
    muscle: {
        type: String,
    },
    difficulty: {
        type: String,
    },
});

const Exercise = model('Exercise', exerciseSchema);

module.exports = Exercise;