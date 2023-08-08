const { gql } = require('apollo-server-express');

const QUERY_USER = gql`
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

const QUERY_GOALS = gql`
  query goals($username: String) {
    goals(username: $username) {
      _id
      goalText
      createdAt
      endDate
    }
  }
`;

const QUERY_WORKOUTS = gql`
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

const QUERY_QUOTES = gql`
  query quotes {
    quotes {
      _id
      quoteText
    }
  }
`;

const QUERY_ME = gql`
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

module.exports = {
  QUERY_USER,
  QUERY_GOALS,
  QUERY_WORKOUTS,
  QUERY_QUOTES,
  QUERY_ME,
};
