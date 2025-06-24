import React from 'react';
import { FaSearch } from 'react-icons/fa';
import './Hero.css';

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-overlay"></div>
      <div className="hero-content">
        <h2>New city? New budget?<br/>Find your perfect roommate.</h2>
        <div className="search-box">
          <input
            type="text"
            placeholder="Search by city, budget…"
            className="search-input"
          />
          <button className="search-btn">
            <FaSearch />
          </button>
        </div>
      </div>
    </section>
  );
}
