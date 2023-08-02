const { AuthenticationError } = require('apollo-server-express');
const { User, Goal, Quote, Exercise } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    users: async () => {
      return User.find().populate('goals quotes exercises');
    },
    user: async (parent, { username }) => {
      return User.findOne({ username }).populate('goals quotes exercises');
    },
    goals: async (parent, { username }) => {
      const params = username ? { username } : {};
      return Goal.find(params).sort({ createdAt: -1 });
    },
    goal: async (parent, { goalId }) => {
      return Goal.findOne({ _id: goalId });
    },
    exercises: async (parent, { username }) => {
      const params = username ? { username } : {};
      return Exercise.find(params).sort({ createdAt: -1 });
    },
    exercise: async (parent, { exerciseId }) => {
      return Exercise.findOne({ _id: exerciseId });
    },
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate('goals quotes exercises');
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
          goalAuthor: context.user.username,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { goals: goal._id } }
        );

        return goal;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    // addComment: async (parent, { thoughtId, commentText }, context) => {
    //   if (context.user) {
    //     return Thought.findOneAndUpdate(
    //       { _id: thoughtId },
    //       {
    //         $addToSet: {
    //           comments: { commentText, commentAuthor: context.user.username },
    //         },
    //       },
    //       {
    //         new: true,
    //         runValidators: true,
    //       }
    //     );
    //   }
    //   throw new AuthenticationError('You need to be logged in!');
    // },
    removeThought: async (parent, { thoughtId }, context) => {
      if (context.user) {
        const thought = await Thought.findOneAndDelete({
          _id: thoughtId,
          thoughtAuthor: context.user.username,
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { thoughts: thought._id } }
        );

        return thought;
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
    // removeComment: async (parent, { thoughtId, commentId }, context) => {
    //   if (context.user) {
    //     return Thought.findOneAndUpdate(
    //       { _id: thoughtId },
    //       {
    //         $pull: {
    //           comments: {
    //             _id: commentId,
    //             commentAuthor: context.user.username,
    //           },
    //         },
    //       },
    //       { new: true }
    //     );
    //   }
    //   throw new AuthenticationError('You need to be logged in!');
    // },
  },
};

module.exports = resolvers;
