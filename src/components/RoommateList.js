// src/components/RoommateList.js
import React, { useState } from 'react';
import defaultRoommates from '../data/roommates';
import RoommateCard from './RoommateCard';
import './RoommateList.css';

export default function RoommateList({ customData }) {
  // 1. State for filters
  const [filterCity, setFilterCity] = useState('');
  const [minBudget, setMinBudget] = useState('');
  const [maxBudget, setMaxBudget] = useState('');

  // 2. Use customData if provided, else defaultRoommates
  const data = Array.isArray(customData) && customData.length
    ? customData
    : defaultRoommates;

  // 3. Unique cities for dropdown
  const cities = [...new Set(data.map(r => r.city))];

  // 4. Apply filters
  const filtered = data.filter(r => {
    const matchesCity = filterCity ? r.city === filterCity : true;
    const matchesMin  = minBudget   ? r.budgetMax >= Number(minBudget) : true;
    const matchesMax  = maxBudget   ? r.budgetMin <= Number(maxBudget) : true;
    return matchesCity && matchesMin && matchesMax;
  });

  return (
    <div>
      {/* FILTER BAR */}
      <div className="filter-bar">
        <select
          value={filterCity}
          onChange={e => setFilterCity(e.target.value)}
        >
          <option value="">All Cities</option>
          {cities.map(city => (
            <option key={city} value={city}>{city}</option>
          ))}
        </select>

        <input
          type="number"
          placeholder="Min Budget (₹)"
          value={minBudget}
          onChange={e => setMinBudget(e.target.value)}
        />

        <input
          type="number"
          placeholder="Max Budget (₹)"
          value={maxBudget}
          onChange={e => setMaxBudget(e.target.value)}
        />

        <button onClick={() => {
          setFilterCity('');
          setMinBudget('');
          setMaxBudget('');
        }}>
          Reset
        </button>
      </div>

      {/* CARD LIST WITH STAGGER */}
      <div className="rm-list">
        {filtered.length > 0 ? (
          filtered.map((rm, i) => (
            <RoommateCard
              key={rm.id}
              style={{ '--i': i }}
              name={rm.name}
              city={rm.city}
              budgetMin={rm.budgetMin}
              budgetMax={rm.budgetMax}
              hobbies={rm.hobbies}
            />
          ))
        ) : (
          <p className="no-results">No matches found.</p>
        )}
      </div>
    </div>
  );
}
