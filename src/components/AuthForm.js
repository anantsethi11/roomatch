// src/components/AuthForm.js
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from '../firebase';

export default function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const [email,   setEmail]   = useState('');
  const [password, setPassword] = useState('');
  const [error,   setError]   = useState('');
  const [loading, setLoading] = useState(false);

  // Reset fields & errors when switching modes
  const switchMode = (mode) => {
    setIsLogin(mode);
    setEmail('');
    setPassword('');
    setError('');
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
      }
    } catch (err) {
      setError(err.message);
    }

    setLoading(false);
  };

  return (
    <motion.div
      className="w-full max-w-md mx-auto mt-12 p-6 bg-white rounded-lg shadow-lg"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Toggle Buttons */}
      <div className="flex justify-center mb-6">
        <button
          onClick={() => switchMode(true)}
          className={`px-4 py-2 focus:outline-none ${
            isLogin
              ? 'border-b-2 border-primary text-primary'
              : 'text-gray-600 hover:text-primary'
          }`}
        >
          Login
        </button>
        <button
          onClick={() => switchMode(false)}
          className={`ml-4 px-4 py-2 focus:outline-none ${
            !isLogin
              ? 'border-b-2 border-primary text-primary'
              : 'text-gray-600 hover:text-primary'
          }`}
        >
          Sign Up
        </button>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <p className="text-red-500 text-sm text-center">{error}</p>
        )}

        <div>
          <label htmlFor="email" className="block text-gray-700">
            Email
          </label>
          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full mt-1 px-3 py-2 border rounded-lg
                       focus:ring-primary focus:border-primary"
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-gray-700">
            Password
          </label>
          <input
            id="password"
            type="password"
            required
            minLength={6}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full mt-1 px-3 py-2 border rounded-lg
                       focus:ring-primary focus:border-primary"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full px-4 py-2 bg-primary text-white rounded-lg
                     hover:bg-primary/90 transition disabled:opacity-50"
        >
          {loading
            ? 'Please wait…'
            : isLogin
            ? 'Login'
            : 'Create Account'}
        </button>
      </form>
    </motion.div>
  );
}
