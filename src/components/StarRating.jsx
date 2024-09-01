import React, { useState } from 'react';

const StarRating = ({ initialRating, onRate }) => {
  const [rating, setRating] = useState(initialRating);

  const handleClick = (rate) => {
    setRating(rate);
    if (typeof onRate === 'function') {
        console.log('Calling onRate with:', rate);
      onRate(rate);
    } else {
      console.error('onRate is not a function');
    }
  };

  return (
    <div>
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          onClick={() => handleClick(star)}
          style={{ cursor: 'pointer', color: star <= rating ? 'gold' : 'gray' }}
        >
          ★
        </span>
      ))}
    </div>
  );
};

export default StarRating;
