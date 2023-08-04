<<<<<<< HEAD
import React from 'react';
import { useQuery } from '@apollo/client';

import ThoughtList from '../components/ThoughtList';
import ThoughtForm from '../components/ThoughtForm';

import { QUERY_THOUGHTS } from '../utils/queries';
=======
import React, { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { useQuery } from "@apollo/client";

import ThoughtList from "../components/ThoughtList";
import ThoughtForm from "../components/ThoughtForm";

import { QUERY_THOUGHTS } from "../utils/queries";

function Home() {
      const { loading, data } = useQuery(QUERY_THOUGHTS);
      const thoughts = data?.thoughts || [];

  const testimonialsData = [
    {
      name: "Hannah S.",
      body: "Who knew that getting insulted could be so motivating? The Drill Sergeant Fitness app is unlike anything I've ever tried. The funny insults push me to work harder, and it's a great stress-buster too. I love this unique approach to fitness!",
    },
    {
      name: "Jake M. ",
      body: "I used to dread workouts, but now I can't wait for my daily 'insult fix' from the app. It's amazing how a well-timed joke can make those burpees feel less daunting. Thanks to Drill Sergeant Fitness, I'm more consistent and determined to reach my goals.",
    },
    {
      name: "Amanda R",
      body: "The humor in this app is gold! It's what keeps me going when I feel like giving up. The virtual drill sergeants crack me up even on the toughest days. I'm making progress, and I'm having a blast doing it!",
    },
    {
      name: "Alex D.",
      body: "Drill Sergeant Fitness is the perfect blend of tough love and comic relief. The workouts are challenging, and the insults are hilariously motivating. It's like having a personal cheerleader who also happens to be a stand-up comedian!",
    },
  ];
  const testimonialsList = testimonialsData.map((testimonialsData, index) => (
    <div key={index} className="card mb-3 testimonials">
      <div className="card-body">
        <blockquote className="blockquote mb-0">
          <p>"{testimonialsData.body}"</p>
          <footer className="blockquote-footer">{testimonialsData.name}</footer>
        </blockquote>
      </div>
    </div>
  ));
>>>>>>> ba7e6012f5a26ccdd1019dacbdc1e011eb28255f

const Home = () => {
  const { loading, data } = useQuery(QUERY_THOUGHTS);
  const thoughts = data?.thoughts || [];

  return (
    <main>
      <div className="flex-row justify-center">
        <div
          className="col-12 col-md-10 mb-3 p-3"
          style={{ border: '1px dotted #1a1a1a' }}
        >
          <ThoughtForm />
        </div>
        <div className="col-12 col-md-8 mb-3">
          {loading ? (
            <div>Loading...</div>
          ) : (
            <ThoughtList
              thoughts={thoughts}
              title="Some Feed for Thought(s)..."
            />
          )}
        </div>
      </div>
    </main>
  );
};

export default Home;
