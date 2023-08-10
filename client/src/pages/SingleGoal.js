import React from 'react';
import GoalForm from '../components/Goalform';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_GOALS, QUERY_ME } from '../utils/queries';
import { REMOVE_GOAL } from '../utils/mutations';

const GoalPage = () => {
  const { loading, data } = useQuery(QUERY_GOALS);
  const [deleteGoal] = useMutation(REMOVE_GOAL);

  const handleDelete = async (goalId) => {
    try {
      await deleteGoal({
        variables: { goalId },
        refetchQueries: [{ query: QUERY_GOALS }, { query: QUERY_ME }],
      });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className='notHome'>
      <GoalForm />
      <div>
        <h3>Current Goals:</h3>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <ul>
            {data.goals.map((goal) => (
              <li key={goal._id}>
                <p>Goal: {goal.goalText}</p>
                <p>Created On: {goal.createdAt}</p>
                <p>Due Date: {goal.endDate}</p>
                <button onClick={() => handleDelete(goal._id)}>Delete</button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default GoalPage;
