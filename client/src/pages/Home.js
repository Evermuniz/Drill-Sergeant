// Comments by Ever Muniz

// importing react and green sock for animation
import React, { useEffect } from "react";
import { gsap } from "gsap";

// fake testimonial data
function Home() {
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
  // mapping the testimonial data over a single component
  const testimonialsList = testimonialsData.map((testimonialsData, index) => (
    <div key={index} className="card mb-3 testimonials">
      <div className="card-body">
        <blockquote className="blockquote">
          <p>"{testimonialsData.body}"</p>
          <footer className="blockquote-footer">{testimonialsData.name}</footer>
        </blockquote>
      </div>
    </div>
  ));


// animation for home page from green sock
  useEffect(() => {
    gsap.to(".box", {
      y: -100,
      delay: 1,
      duration: 2,
      opacity: 1,
      fill: "#000000",
      immediateRender: false,
    });
  }, []);

  // render the home page
  return (
    <main className="home">
      {" "}
      <div className="flex-row justify-center box">
        {" "}
        <div className="landingPageText">
          <h1 className="text-center card-title">About Us:</h1>{" "}
          <p className="text-center">
            Welcome to Drill Sergeant Fitness, where tough love meets humor for epic gains! Our app is all about pushing
            you to new heights with a touch of laughter. Set your fitness goals, and our hilarious virtual drill
            sergeants will keep you motivated with funny insults that pack a punch. It's tough love with a twist! Join
            our supportive community, smash your fitness targets, and have a blast along the way. Embrace the sweat, the
            struggle, and the snark - Drill Sergeant Fitness is here to make your fitness journey exciting and
            effective. Get ready to laugh, work hard, and achieve big gains with our unique approach to fitness!{" "}
          </p>{" "}
        </div>{" "}
        <div>
          <h2 className="text-center card">Testimonials</h2> {testimonialsList}
        </div>{" "}
      </div>
    </main>
  );
}

export default Home;
