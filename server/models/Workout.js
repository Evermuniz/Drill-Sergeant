const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const SetSchema = new Schema({
    reps: {
        type: Number,
    },
    weight: {
        type: Number,
    },
});

const exerciseSchema = new Schema({
    name: {
        type: String,
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
