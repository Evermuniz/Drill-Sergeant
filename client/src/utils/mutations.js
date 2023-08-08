import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_GOAL = gql`
  mutation addGoal($goalText: String!) {
    addGoal(goalText: $goalText) {
      _id
      goalText
      createdAt
      endDate
    }
  }
`;

export const ADD_WORKOUT = gql`
  mutation addWorkout($date: String!) {
    addWorkout(date: $date) {
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

