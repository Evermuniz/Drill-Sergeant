const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const SetSchema = new Schema({
    reps: {
        type: Number,
        required: true,
    },
    weight: {
        type: Number,
        required: true,
    },
});

const exerciseSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    sets: [SetSchema],
    required: true,
});

const workoutSchema = new Schema({
    date: {
        type: Date,
        default: Date.now,
        get: (timestamp) => dateFormat(timestamp),
    },
    exercises: [exerciseSchema],
    required: true,
});

const Workout = model('Workout', workoutSchema);

module.exports = Workout;