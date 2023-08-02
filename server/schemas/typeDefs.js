const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    password: String
    goals: [Goal]
    quotes: [Quote]
    Exercise: [Exercise]
  }

  type Goal{
    _id: ID
    goalText: String
    createdAt: String
  }

  type Quote {
    _id: ID
    quoteText: String
  }

  type Exercise {
    name: String
    type: String
    muscle: String
    difficulty: String
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
    Exercise: [Exercise]
    me: User
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addGoal(goalText: String!): Goal
    addExercise(name: String!, type: String!, muscle: String!, difficulty: String!): Exercise
    removeGoal(goalId: ID!): Goal
    removeExercise(exerciseId: ID!): Exercise
  }
`;

module.exports = typeDefs;
