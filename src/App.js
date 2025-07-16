// src/App.js
import React, { useState, useEffect } from 'react';
import './App.css';

import Navbar       from './components/Navbar';
import Hero         from './components/Hero';
import AuthForm     from './components/AuthForm';
import ProfileForm  from './components/ProfileForm';
import RoommateList from './components/RoommateList';

import {
  db,
  auth,
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
  onAuthStateChanged
} from './firebase';

export default function App() {
  const [user, setUser]       = useState(null);
  const [profiles, setProfiles] = useState([]);

  // 1) Auth listener
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, current => {
      setUser(current);
    });
    return unsub;
  }, []);

  // 2) Firestore listener
  useEffect(() => {
    const q = query(
      collection(db, 'roommates'),
      orderBy('createdAt', 'desc')
    );
    const unsub = onSnapshot(q, snap => {
      setProfiles(
        snap.docs.map(doc => ({ id: doc.id, ...doc.data() }))
      );
    });
    return unsub;
  }, []);

  // 3) Add a new profile
  async function handleAddProfile(profile) {
    await addDoc(collection(db, 'roommates'), {
      ...profile,
      createdAt: new Date()
    });
  }
  <div className="bg-primary min-h-screen text-white">
  Testing Tailwind CDN…
  </div>

  return (
    <div className="App">
      <Navbar />
      <Hero />
      <main className="container">
        <AuthForm user={user} setUser={setUser} />

        {user && (
          <>
            <ProfileForm onAdd={handleAddProfile} />
            <h2 className="section-title">
              Available Roommates
            </h2>
            <RoommateList customData={profiles} />
          </>
        )}
      </main>
    </div>
  );
}
