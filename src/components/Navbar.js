import React from 'react';
import { FaUserCircle } from 'react-icons/fa';
import './Navbar.css';

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">RooMatch</div>
      <ul className="nav-links">
        <li><a href="#find">Find</a></li>
        <li><a href="#post">Post</a></li>
        <li><a href="#about">About</a></li>
      </ul>
      <button className="login-btn">
        <FaUserCircle /> Login
      </button>
    </nav>
  );
}
