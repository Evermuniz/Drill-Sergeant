// set up typeDefs to match the resolvers
const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    password: String
    goals: [Goal]!
    workouts: [Workout]!
  }

  type Goal {
    _id: ID
    goalText: String
    createdAt: String
    endDate: String
  }

  type Quote {
    _id: ID
    quoteText: String
  }

  type Set {
    reps: Int
    weight: Int
  }

  type Exercise {
    name: String
    sets: [Set]!
  }

  type Workout {
    _id: ID
    date: String
    exercises: [Exercise]!
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(username: String!): User
    goals(username: String): [Goal]
    goal(goalId: ID!): Goal
    workouts(username: String): [Workout]
    workout(workoutId: ID!): Workout
    quotes: [Quote]
    me: User
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addGoal(goalText: String!, endDate: String): Goal
    addWorkout(exercises: [ExerciseInput]!): Workout
    addExercise(workoutId: ID!, exercise: ExerciseInput!): Workout
    removeGoal(goalId: ID!): Goal
    removeWorkout(workoutId: ID!): Workout
  }

  input SetInput {
    reps: Int
    weight: Int
  }

  input ExerciseInput {
    name: String
    sets: [SetInput]!
  }
`;

module.exports = typeDefs;
