const { AuthenticationError } = require('apollo-server-express');
const { User, Goal, Quote, Workout } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    users: async () => {
      return User.find().populate('goals workouts');
    },
    user: async (parent, { username }) => {
      return User.findOne({ username }).populate('goals workouts');
    },
    goals: async (parent, { username }) => {
      const params = username ? { username } : {};
      return Goal.find(params).sort({ createdAt: -1 });
    },
    goal: async (parent, { goalId }) => {
      return Goal.findOne({ _id: goalId });
    },
   workouts: async (parent, { username }) => {
      const params = username ? { username } : {};
      return Workout.find(params).sort({ createdAt: -1 });
    },
    workout: async (parent, { workoutId }) => {
      return Workout.findOne({ _id: workoutId });
    },
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate('goals workouts');
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  },

  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('No user found with this email address');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);

      return { token, user };
    },
    addGoal: async (parent, { goalText }, context) => {
      if (context.user) {
        const goal = await Goal.create({
          goalText,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { goals: goal._id } }
        );

        return goal;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    addWorkout: async (parent, { exercises }, context) => {
      if (context.user) {
        const workout = await Workout.create({
          exercises,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { workouts: workout._id } }
        );

        return workout;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    addExercise: async (parent, { name, sets}, context) => {
      if (context.user) {
        const exercise = await exerciseSchema.create({
          name,
          sets,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { exercises: exercise._id } }
        );

        return exercise;
      }
      throw new AuthenticationError('You need to be logged in!');
    },

    removeGoal: async (parent, { goalId }, context) => {
      if (context.user) {
        const goal = await Goal.findOneAndDelete({
          _id: goalId,
          goalAuthor: context.user.username,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { goals: goal._id } }
        );

        return goal;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    removeWorkout: async (parent, { workoutId }, context) => {
      if (context.user) {
        const workout = await Workout.findOneAndDelete({
          _id: workoutId,
          workoutAuthor: context.user.username,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { workouts: workout._id } }
        );

        return workout;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    removeExercise: async (parent, { exerciseId }, context) => {
      if (context.user) {
        const exercise = await Exercise.findOneAndDelete({
          _id: exerciseId,
          exerciseAuthor: context.user.username,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { exercises: exercise._id } }
        );

        return exercise;
      }
      throw new AuthenticationError('You need to be logged in!');
    }
  },
};

module.exports = resolvers;
