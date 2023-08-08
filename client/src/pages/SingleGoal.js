import React from 'react';


import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';


import { QUERY_SINGLE_GOAL } from '../utils/queries';

const SingleGoal = () => {

  const { goalId } = useParams();

  const { loading, data } = useQuery(QUERY_SINGLE_GOAL, {
    
    variables: { goalId: goalId },
  });

  const Goal = data?.Goal || {};

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="my-3">
      <h3 className="card-header bg-dark text-light p-2 m-0">
        {thought.thoughtAuthor} <br />
        <span style={{ fontSize: '1rem' }}>
          Workout Goal! {goal.createdAt}
        </span>
      </h3>
      <div className="bg-light py-4">
        <blockquote
          className="p-4"
          style={{
            fontSize: '1.5rem',
            fontStyle: 'italic',
            border: '2px dotted #1a1a1a',
            lineHeight: '1.5',
          }}
        >
          {goal.goalText}
        </blockquote>
      </div>


    </div>
  );
};

export default SingleGoal;
