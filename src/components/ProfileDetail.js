// src/components/ProfileDetail.js

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { auth, db }                    from '../firebase';
import { doc, getDoc }                 from 'firebase/firestore';
import { motion }                      from 'framer-motion';

export default function ProfileDetail() {
  const { uid } = useParams();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchProfile() {
      try {
        const docRef  = doc(db, 'profiles', uid);
        const snapshot = await getDoc(docRef);

        if (snapshot.exists()) {
          setProfile(snapshot.data());
        } else {
          // No such profile, redirect home
          navigate('/', { replace: true });
        }
      } catch (err) {
        console.error('Error fetching profile:', err);
        navigate('/', { replace: true });
      } finally {
        setLoading(false);
      }
    }

    fetchProfile();
  }, [uid, navigate]);

  if (loading) {
    return (
      <p className="text-center mt-12">
        Loading profile…
      </p>
    );
  }

  if (!profile) {
    return null; // Already redirected
  }

  // Build a deterministic chat ID from the two UIDs
  const chatId = [auth.currentUser.uid, uid].sort().join('_');

  return (
    <motion.div
      className="max-w-md mx-auto px-6 py-8 bg-white rounded-lg shadow-lg mt-12"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <button
        onClick={() => navigate(-1)}
        className="text-primary hover:underline mb-4"
      >
        &larr; Back
      </button>

      <h2 className="text-2xl font-bold mb-4">
        {profile.displayName}
      </h2>
      <p className="mb-2">Age: {profile.age}</p>
      <p className="mb-2">Location: {profile.location}</p>
      <p className="mb-4">Budget: {profile.budget}</p>

      <Link
        to={`/chat/${chatId}`}
        className="inline-block px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition"
      >
        Message {profile.displayName}
      </Link>
    </motion.div>
  );
}
