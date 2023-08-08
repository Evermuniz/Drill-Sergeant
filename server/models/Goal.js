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
        type: Date,
        default: Date.now,
        get: (timestamp) => dateFormat(timestamp),
        validate: {
            validator: function (endDate) {
                return endDate > this.createdAt;
            }
        }
    },
});

const Goal = model('Goal', goalSchema);

module.exports = Goal;