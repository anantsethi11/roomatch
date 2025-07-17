import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate }     from 'react-router-dom';

import { onAuthStateChanged }           from 'firebase/auth';
import {
  auth,
  db,
  collection,
  onSnapshot
} from './firebase';

import Navbar         from './components/Navbar';
import Hero           from './components/Hero';
import AuthForm       from './components/AuthForm';
import ProfileForm    from './components/ProfileForm';
import ProfileDetail  from './components/ProfileDetail';
import RoommateList   from './components/RoommateList';
import ChatRoom       from './components/ChatRoom';

export default function App() {
  const [user, setUser]         = useState(null);
  const [profiles, setProfiles] = useState([]);

  // 1) Auth state listener
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, setUser);
    return unsub;
  }, []);

  // 2) Firestore profiles subscription
  useEffect(() => {
    const q = collection(db, 'profiles');
    const unsub = onSnapshot(q, (snap) => {
      setProfiles(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    return unsub;
  }, []);

  return (
    <div className="min-h-screen bg-bgLight text-text pt-16">
      <Navbar user={user} />

      <Routes>
        {/* Home: Hero + AuthForm or Listings */}
        <Route
          path="/"
          element={
            <>
              <Hero />
              {!user ? (
                <AuthForm />
              ) : !user.displayName ? (
                <Navigate to="/profile" replace />
              ) : (
                <RoommateList
                  profiles={profiles}
                  currentUser={user}
                />
              )}
            </>
          }
        />

        {/* Complete your profile */}
        <Route
          path="/profile"
          element={
            user ? (
              !user.displayName ? (
                <ProfileForm user={user} />
              ) : (
                <Navigate to="/" replace />
              )
            ) : (
              <Navigate to="/" replace />
            )
          }
        />

        {/* View someone’s profile */}
        <Route
          path="/profile/:uid"
          element={<ProfileDetail />}
        />

        {/* Chat room */}
        <Route
          path="/chat/:chatId"
          element={<ChatRoom />}
        />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}
