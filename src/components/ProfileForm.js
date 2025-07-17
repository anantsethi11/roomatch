import React, { useState }         from 'react';
import { motion }                  from 'framer-motion';
import { auth, db }                from '../firebase';
import { doc, setDoc }             from 'firebase/firestore';
import { updateProfile }           from 'firebase/auth';

export default function ProfileForm({ user }) {
  const [displayName, setDisplayName] = useState('');
  const [age, setAge]                 = useState('');
  const [location, setLocation]       = useState('');
  const [budget, setBudget]           = useState('');
  const [error, setError]             = useState('');
  const [loading, setLoading]         = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Update Firebase Auth
      await updateProfile(auth.currentUser, { displayName });

      // Write profile doc with budget
      await setDoc(doc(db, 'profiles', user.uid), {
        displayName,
        age: Number(age),
        location,
        budget,
        email: user.email,
        uid: user.uid,
        createdAt: new Date()
      });

      setLoading(false);
      window.location.reload();
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <motion.div
      className="w-full max-w-md mx-auto my-12 p-6 bg-white rounded-lg shadow-lg"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="text-2xl font-bold text-center mb-6">
        Complete Your Profile
      </h2>

      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-gray-700">
            Display Name
          </label>
          <input
            id="name"
            type="text"
            required
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            className="w-full mt-1 px-3 py-2 border rounded-lg
                       focus:ring-primary focus:border-primary"
          />
        </div>

        <div>
          <label htmlFor="age" className="block text-gray-700">
            Age
          </label>
          <input
            id="age"
            type="number"
            required
            min="18"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className="w-full mt-1 px-3 py-2 border rounded-lg
                       focus:ring-primary focus:border-primary"
          />
        </div>

        <div>
          <label htmlFor="location" className="block text-gray-700">
            City / Area
          </label>
          <input
            id="location"
            type="text"
            required
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full mt-1 px-3 py-2 border rounded-lg
                       focus:ring-primary focus:border-primary"
          />
        </div>

        <div>
          <label htmlFor="budget" className="block text-gray-700">
            Budget (per month)
          </label>
          <input
            id="budget"
            type="text"
            required
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
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
          {loading ? 'Saving…' : 'Save Profile'}
        </button>
      </form>
    </motion.div>
  );
}
