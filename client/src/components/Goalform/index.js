import React, { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { ADD_GOAL } from '../../utils/mutations';
import { QUERY_GOALS, QUERY_ME } from '../../utils/queries';
import Auth from '../../utils/auth';
import { Link } from 'react-router-dom';

const GoalForm = () => {
  const [goalText, setGoalText] = useState('');
  const [endDate, setEndDate] = useState('');
  const [characterCount, setCharacterCount] = useState(0);
  const goals = useQuery( QUERY_GOALS);
  const me = useQuery( QUERY_ME);

  const [addGoal, { error }] = useMutation(ADD_GOAL, {
    update(cache, { data: { addGoal } }) {
      try {
        console.log(goals);
        cache.writeQuery({
          query: QUERY_GOALS,
          data: { goals: [addGoal, ...goals.data.goals] }
        });
      } catch (e) {
        console.error(e);
      }

      console.log(me);
      cache.writeQuery({
        query: QUERY_ME,
        data: { me: { ...me, goals: [...me.data.me.goals, addGoal] } }
      });
    }
  });

  const handleChange = event => {
    if (event.target.value.length <= 280) {
      setGoalText(event.target.value);
      setCharacterCount(event.target.value.length);
    }
  }

  const handleEndDateChange = event => {
    setEndDate(event.target.value);
  }

  const handleFormSubmit = async event => {
    event.preventDefault();

    try {
      console.log(typeof ( endDate));
      await addGoal({
        variables: { goalText: goalText, endDate: endDate }
      });

      setGoalText('');
      setCharacterCount(0);
      setEndDate('');
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <div>
      <h3>What is your Workout Goal!</h3>

      {Auth.loggedIn() ? (
        <>
          <p
            className={`m-0 ${
              characterCount === 280 || error ? 'text-danger' : ''
            }`}
          >
            Character Count: {characterCount}/280
          </p>
          <form
            className="flex-row justify-center justify-space-between-md align-center"
            onSubmit={handleFormSubmit}
          >
            <div className="col-12 col-lg-9">
              <textarea
                name="goalText"
                placeholder="Here's a new goal..."
                value={goalText}
                className="form-input w-100"
                style={{ lineHeight: '1.5', resize: 'vertical' }}
                onChange={handleChange}
              ></textarea>
            </div>

            <div className="col-12 col-lg-9">
              <label htmlFor="endDate">End Date:</label>
              <input
                type="date"
                id="endDate"
                name="endDate"
                value={endDate}
                onChange={handleEndDateChange}
              />
              {new Date(endDate) <= new Date() && (
               <p className="text-danger">End date must be after today.</p>
              )}
            </div>

            <div className="col-12 col-lg-3">
              <button className="btn btn-primary btn-block py-3" type="submit">
                Add Goal
              </button>
            </div>
            {error && (
              <div className="col-12 my-3 bg-danger text-white p-3">
                {error.message}
              </div>
            )}
          </form>
        </>
      ) : (
        <p>
          You need to be logged in to share your thoughts. Please{' '}
          <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
        </p>
      )}
    </div>
  );
};

export default GoalForm;
