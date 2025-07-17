// src/components/Navbar.js
import React from 'react';
import { FaHome, FaUserCircle } from 'react-icons/fa';
import { Link, useNavigate }    from 'react-router-dom';
import { signOut }              from 'firebase/auth';
import { auth }                 from '../firebase';

export default function Navbar({ user }) {
  const navigate = useNavigate();

  return (
    <nav className="bg-white shadow-md fixed w-full z-10">
      <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo / Home */}
        <Link to="/" className="flex items-center space-x-2">
          <FaHome className="text-primary text-2xl" />
          <span className="font-bold text-xl text-primary">RooMatch</span>
        </Link>

        <ul className="flex items-center space-x-4 text-text">
          {/* Home */}
          <li>
            <Link to="/" className="hover:text-primary transition">
              Home
            </Link>
          </li>

          {/* Profile (only if signed in) */}
          {user && (
            <li>
              <Link to="/profile" className="flex items-center hover:text-primary transition">
                <FaUserCircle className="mr-1" /> Profile
              </Link>
            </li>
          )}

          {/* Login or Logout */}
          {!user ? (
            <li>
              <Link to="/" className="hover:text-primary transition">
                Login
              </Link>
            </li>
          ) : (
            <li>
              <button
                onClick={() => signOut(auth)}
                className="hover:text-primary transition"
              >
                Logout
              </button>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}
