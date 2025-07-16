// src/components/AuthForm.js
import React, { useState } from 'react';
import {
  auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut
} from '../firebase';
import './AuthForm.css';

export default function AuthForm({ user, setUser }) {
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [mode, setMode]         = useState('login'); // 'login' or 'signup'

  const handleSubmit = e => {
    e.preventDefault();
    const action =
      mode === 'signup'
        ? createUserWithEmailAndPassword
        : signInWithEmailAndPassword;

    action(auth, email, password)
      .then(credential => {
        setUser(credential.user);
        setEmail('');
        setPassword('');
      })
      .catch(err => alert(err.message));
  };

  const handleLogout = () => {
    signOut(auth).then(() => setUser(null));
  };

  return (
    <div className="auth-form">
      {!user ? (
        <form onSubmit={handleSubmit}>
          <h3>{mode === 'signup' ? 'Create Account' : 'Login'}</h3>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Email"
            required
          />
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
          <button type="submit">
            {mode === 'signup' ? 'Sign Up' : 'Login'}
          </button>
          <p
            className="switch-mode"
            onClick={() =>
              setMode(mode === 'signup' ? 'login' : 'signup')
            }
          >
            {mode === 'signup'
              ? 'Already have an account? Login'
              : 'No account? Sign up'}
          </p>
        </form>
      ) : (
        <div className="welcome">
          <p>Welcome, {user.email}</p>
          <button onClick={handleLogout}>Log Out</button>
        </div>
      )}
    </div>
  );
}
