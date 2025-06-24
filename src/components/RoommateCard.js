import React from 'react';
import './RoommateCard.css';

export default function RoommateCard({
  name,
  city,
  budgetMin,
  budgetMax,
  hobbies,
  style
}) {
  return (
    <div className="rm-card" style={style}>
      <h3>{name}</h3>
      <p>City: <strong>{city}</strong></p>
      <p>Budget: <strong>₹{budgetMin} - ₹{budgetMax}</strong></p>
      <p>Hobbies: {hobbies.join(' ')}</p>
    </div>
  );
}
