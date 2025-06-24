import React from 'react';
import './App.css';
import Navbar      from './components/Navbar';
import Hero        from './components/Hero';
import RoommateList from './components/RoommateList';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Hero />
      <main className="container">
        <h2 style={{ color: 'var(--text-dark)', marginBottom: '24px' }}>
        Available Roommates
        </h2>
        <RoommateList />
      </main>
    </div>
  );
}

export default App;
