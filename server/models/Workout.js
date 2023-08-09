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
});

const workoutSchema = new Schema({
    date: {
        type: Date,
        default: Date.now,
        get: (timestamp) => dateFormat(timestamp),
    },
    exercises: [exerciseSchema],
});

const Workout = model('Workout', workoutSchema);
const Exercise = model('Exercise', exerciseSchema);
const Set = model('Set', SetSchema);

module.exports = Workout;
module.exports = Exercise;
module.exports = Set;
