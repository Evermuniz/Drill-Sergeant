// Initialize all models and export them for use in other files
const User = require('./User');
const Goal = require('./Goal');
const Quote = require('./Quote');
const Workout = require('./Workout');
const Exercise = require('./Workout');
const Set = require('./Workout');

module.exports = { User, Goal, Quote, Workout, Exercise, Set };
