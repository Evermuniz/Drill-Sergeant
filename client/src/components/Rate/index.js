import React, { useState, useEffect } from "react";
import { Rating } from '@smastrom/react-rating';
 import '@smastrom/react-rating/style.css'

const Rate = () => {
  const [rating, setRating] = useState();
  const [ratingsData, setRatingsData] = useState({});

  useEffect(() => {
    fetch("/quoteSeeds.json")
      .then(response => response.json())
      .then(data => setRatingsData(data))
      .catch(error => console.error("Error fetching data:", error));
  }, []);

  const getRandomLabel = (labels) => {
    const randomIndex = Math.floor(Math.random() * labels.length);
    return labels[randomIndex];
  };

  const getRating = (rating) => {
    const labels = ratingsData[rating];
    if (labels) {
      return getRandomLabel(labels);
    }
    return 'None';
  };

  return (
    <div style={{ maxWidth: 180, width: '100%' }}>
      <Rating value={rating} onChange={setRating} />
      <div>
        <div>{` ${getRating(rating)}`}</div>
      </div>
    </div>
  );
}

export default Rate;
