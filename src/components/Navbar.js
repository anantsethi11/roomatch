// src/components/Navbar.js
import React from 'react';
import { FaHome } from 'react-icons/fa';

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <FaHome className="text-primary text-2xl" />
          <span className="font-bold text-xl text-primary">RooMatch</span>
        </div>
        <ul className="flex space-x-4 text-text">
          <li><a href="#hero" className="hover:text-primary transition">Home</a></li>
          <li><a href="#form" className="hover:text-primary transition">List</a></li>
          <li><a href="#auth" className="hover:text-primary transition">Login</a></li>
        </ul>
      </div>
    </nav>
  );
}
