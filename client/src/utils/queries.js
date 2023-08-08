import { gql } from '@apollo/client';

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      goals {
        _id
        goalText
        createdAt
        endDate
      }
      workouts {
        _id
        date
        exercises {
          name
          sets {
            reps
            weight
          }
        }
      }
    }
  }
`;

export const QUERY_GOALS = gql`
  query goals($username: String) {
    goals(username: $username) {
      _id
      goalText
      createdAt
      endDate
    }
  }
`;

export const QUERY_SINGLE_GOAL = gql`
  query goal($goalId: ID!) {
    goal(goalId: $goalId) {
      _id
      goalText
      createdAt
      endDate
    }
  }
`;

export const QUERY_WORKOUTS = gql`
  query workouts($username: String) {
    workouts(username: $username) {
      _id
      date
      exercises {
        name
        sets {
          reps
          weight
        }
      }
    }
  }
`;

export const QUERY_QUOTES = gql`
  query quotes {
    quotes {
      _id
      quoteText
    }
  }
`;

export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      email
      goals {
        _id
        goalText
        createdAt
        endDate
      }
      workouts {
        _id
        date
        exercises {
          name
          sets {
            reps
            weight
          }
        }
      }
    }
  }
`;
