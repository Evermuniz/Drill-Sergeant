import React, { useState, useEffect } from "react";
import { Rating } from '@smastrom/react-rating';

const Rate = () => {
  const [rating, setRating] = useState(3);
  const [hoveredRating, setHoveredRating] = useState(0);
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
      <Rating value={rating} onChange={setRating} onHoverChange={setHoveredRating} />
      <div>
        <div>{`Selected: ${getRating(rating)}`}</div>
        <div>{`Hovered: ${getRating(hoveredRating)}`}</div>
      </div>
    </div>
  );
}

export default Rate;
