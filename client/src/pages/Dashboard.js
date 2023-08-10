import React from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import { QUERY_USER, QUERY_ME } from '../utils/queries';
import Auth from '../utils/auth';

const SetDetails = ({ set }) => (
  <li>
    <p>Reps: {set.reps}</p>
    <p>Weight: {set.weight}</p>
  </li>
);

const ExerciseDetails = ({ exercise }) => (
  <li>
    <p>Exercise: {exercise.name}</p>
    <ul>
      {exercise.sets.map((set, setIndex) => (
        <SetDetails key={setIndex} set={set} />
      ))}
    </ul>
  </li>
);

const Dashboard = () => {
  const { username: userParam } = useParams();

  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam },
  });

  const user = data?.me || data?.user || {};

  if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
    return <Navigate to="/me" />;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user?.username) {
    return (
      <h4>
        You need to be logged in to see this. Use the navigation links above to
        sign up or log in!
      </h4>
    );
  }

  return (
    <div>
      <div className="flex-row justify-center mb-3">
        <h2 className="col-12 col-md-10 bg-dark text-light p-3 mb-5">
          Viewing {userParam ? `${user.username}'s` : 'your'} dashboard.
        </h2>
      </div>
      <div>
        <h3>Goals:</h3>
        <ul>
          {user.goals.map((goal) => (
            <li key={goal._id}>
              <p>Goal: {goal.goalText}</p>
              <p>Created On: {goal.createdAt}</p>
              <p>Due Date: {goal.endDate}</p>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h3>Previous Workouts:</h3>
        <ul>
          {user.workouts.map((workout) => (
            <li key={workout._id}>
              <p>Date: {workout.date}</p>
              <ul>
                {workout.exercises.map((exercise, index) => (
                  <ExerciseDetails key={index} exercise={exercise} />
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
