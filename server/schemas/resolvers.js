const { AuthenticationError } = require('apollo-server-express');
const { User, Goal, Quote, Workout, SetSchema, exerciseSchema, } = require('../models');
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
    quotes: async () => {
      return Quote.find();
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
    addGoal: async (parent, { goalText, endDate }, context) => {
      if (context.user) {
        const goal = await Goal.create({
          goalText,
          endDate,
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
          { $addToSet: { workouts: workout._id, } }
        );

        return workout;
      }
      throw new AuthenticationError('You need to be logged in!');
    }, 
    addExercise: async (parent, { workoutId , exercise }, context) => {
      if (context.user) {
        // i need to grab the workout id and push the exercise to the workout and need the name and sets to hold the data
        const { name, sets } = exercise;
      
        const workout = await Workout.findOne ({ _id: workoutId});

        if (!workout) {
          throw new Error ('No workout found!');
        }

        workout.exercises.push({ name, sets});
        await workout.save();
        console.log(workout);
        return workout;
        
         
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    addSet : async (parent, { exerciseId , set }, context) => {
      if (context.user) {
        const { reps, weight } = set;

        const workout = await Workout.findOne ({ _id: exerciseId});
        
        if (!workout) {
          throw new Error ('No workout found!');
        }
        workout.exercises.push({ reps, weight});
        await workout.save();
        return workout;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    removeGoal: async (parent, { goalId }, context) => {
      if (context.user) {
        const goal = await Goal.findOneAndDelete({
          _id: goalId,
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
        });

        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { workouts: workout._id } }
        );

        return workout;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    removeExercise: async (parent, { exerciseId, workoutId }, context) => {
      if (context.user) {
        const workout = await Workout.findOneAndDelete(
          { _id: workoutId },
          { $pull: { exercises: exerciseId } }
        );

        if (!workout) {
          throw new Error ('No workout found!');
        }

        return workout;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    removeSet : async (parent, { setId, exerciseId}, context) => {
      if (context.user) {
        const exercise = await Exercise.findOneAndUpdate(
          { _id: exerciseId },
          { $pull: { sets: setId } }
        );

        if (!exercise) {
          throw new Error ('No exercise found!');
        }

        return exercise;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  },
};

module.exports = resolvers;
