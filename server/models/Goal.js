// created Goal model that will be connected to User model, using dateFormat util to format date
const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');


const goalSchema = new Schema({
    goalText: {
        type: String,
        required: 'You need to leave a goal!',
        minlength: 1,
        maxlength: 280,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (timestamp) => dateFormat(timestamp),
    },
    endDate: {
        type: String,
        default: Date.now,
        get: (timestamp) => dateFormat(timestamp),
    },
});

const Goal = model('Goal', goalSchema);

module.exports = Goal;