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
  mutation addGoal($goalText: String! $endDate: String) {
    addGoal(goalText: $goalText , endDate: $endDate) {
      _id
      goalText
      createdAt
      endDate
    }
  }
`;

export const ADD_WORKOUT = gql`
  mutation addWorkout($exercises: [ExerciseInput]!) {
    addWorkout(exercises: $exercises) {
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

  export const ADD_EXERCISE = gql`
  mutation addExercise($workoutId: ID!, $exercise: ExerciseInput!) {
    addExercise(workoutId: $workoutId, exercise: $exercise) {
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

export const REMOVE_GOAL = gql`
  mutation removeGoal($goalId: ID!) {
    removeGoal(goalId: $goalId) {
      _id
      goalText
      createdAt
      endDate
    }
  }
`;

export const REMOVE_WORKOUT = gql`
  mutation removeWorkout($workoutId: ID!) {
    removeWorkout(workoutId: $workoutId) {
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





