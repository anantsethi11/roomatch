import React from 'react';
import { motion }    from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { auth }      from '../firebase';

export default function RoommateCard({ profile }) {
  const navigate = useNavigate();
  const { displayName, age, location, budget, uid } = profile;

  // Deterministic chat ID
  const chatId = [auth.currentUser.uid, uid].sort().join('_');

  return (
    <motion.div
      className="bg-white rounded-lg shadow p-6 flex flex-col justify-between"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      whileHover={{ scale: 1.03, boxShadow: '0 10px 20px rgba(0,0,0,0.12)' }}
    >
      <div>
        <h3 className="text-xl font-semibold mb-2">
          {displayName}
        </h3>
        <p className="text-gray-600">Age: {age}</p>
        <p className="text-gray-600">Location: {location}</p>
        <p className="text-gray-600">Budget: {budget}</p>
      </div>

      <div className="mt-6 flex justify-between">
        <Link
          to={`/profile/${uid}`}
          className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg
                     hover:bg-gray-300 transition"
        >
          View Profile
        </Link>

        <button
          onClick={() => navigate(`/chat/${chatId}`)}
          className="px-4 py-2 bg-primary text-white rounded-lg
                     hover:bg-primary/90 transition"
        >
          Message
        </button>
      </div>
    </motion.div>
  );
}
