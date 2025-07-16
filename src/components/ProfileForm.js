import React, { useState } from 'react';
import './ProfileForm.css';

export default function ProfileForm({ onAdd }) {
  const [name, setName] = useState('');
  const [city, setCity] = useState('');
  const [budgetMin, setBudgetMin] = useState('');
  const [budgetMax, setBudgetMax] = useState('');
  const [hobbies, setHobbies] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    if (!name || !city) return alert('Please fill required fields');

    onAdd({
      id: Date.now(),
      name,
      city,
      budgetMin: Number(budgetMin),
      budgetMax: Number(budgetMax),
      hobbies: hobbies.split(',').map(h => h.trim())
    });

    setName(''); setCity(''); setBudgetMin(''); setBudgetMax(''); setHobbies('');
  }

  return (
    <form className="profile-form" onSubmit={handleSubmit}>
      <h3>Add Your Roommate Profile</h3>

      <input value={name} onChange={e => setName(e.target.value)} placeholder="Name" required />
      <input value={city} onChange={e => setCity(e.target.value)} placeholder="City" required />
      <input type="number" value={budgetMin} onChange={e => setBudgetMin(e.target.value)} placeholder="Min Budget ₹" />
      <input type="number" value={budgetMax} onChange={e => setBudgetMax(e.target.value)} placeholder="Max Budget ₹" />
      <input value={hobbies} onChange={e => setHobbies(e.target.value)} placeholder="Hobbies (comma-separated)" />

      <button type="submit">Post Profile</button>
    </form>
  );
}
