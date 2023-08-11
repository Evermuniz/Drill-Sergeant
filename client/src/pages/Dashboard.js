import React from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_WORKOUTS } from '../utils/queries';
import { REMOVE_WORKOUT } from '../utils/mutations';
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
  const [deleteWorkout] = useMutation(REMOVE_WORKOUT);

  const handleDeleteWorkout = async (workoutId) => {
    try {
      await deleteWorkout({
        variables: { workoutId },
        refetchQueries: [{ query: QUERY_WORKOUTS }, { query: QUERY_ME }],
      });
    } catch (e) {
      console.error(e);
    }
  };

  const user = data?.me || data?.user || {};

  if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
    return <Navigate to="/me" />;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user?.username) {
    return <h4>You need to be logged in to see this. Use the navigation links above to sign up or log in!</h4>;
  }

  return (
    <div className="notHome">
      <div className="flex-row justify-center mb-3">
        <h2 className="col-12 col-md-10 bg-dark text-light p-3 mb-5">
          Viewing {userParam ? `${user.username}'s` : "your"} dashboard.
        </h2>
      </div>
      <div className="card mb-3">
        <h3 className="text-center">Goals:</h3>

        {user.goals.map((goal) => (
          <div className="card p-2 mb-3" key={goal._id}>
            <p className="card-title">Goal: {goal.goalText}</p>
            <p>Created On: {goal.createdAt}</p>
            <p>Due Date: {goal.endDate}</p>
          </div>
        ))}
      </div>
      <div className="card p-2">
        <h3 className="text-center">Previous Workouts:</h3>
        <div>
          {user.workouts.slice().reverse().map((workout) => (
            <div className="card p-2 mb-3" key={workout._id}>
              <p className="card-title">Date: {workout.date}</p>
              <ul>
                {workout.exercises.map((exercise, index) => (
                  <ExerciseDetails key={index} exercise={exercise} />
                ))}
              </ul>
              <li>
                <button onClick={() => handleDeleteWorkout(workout._id)}>Delete</button>
              </li>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
