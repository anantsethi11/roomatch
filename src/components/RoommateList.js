// src/components/RoommateList.js

import React from 'react';
import RoommateCard from './RoommateCard';

export default function RoommateList({ profiles }) {
  return (
    <section
      id="profiles"
      className="max-w-6xl mx-auto px-6 py-12"
    >
      <h2 className="text-3xl font-bold text-center mb-8">
        Available Roommates
      </h2>

      {profiles.length === 0 ? (
        <p className="text-center text-gray-600">
          No profiles yet. Check back soon!
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {profiles.map(profile => (
            <RoommateCard
              key={profile.id}
              profile={profile}
            />
          ))}
        </div>
      )}
    </section>
  );
}
