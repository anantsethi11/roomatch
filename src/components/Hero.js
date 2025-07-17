// src/components/Hero.js
import React from 'react';
import { motion } from 'framer-motion';
import heroIllustration from '../assets/hero-illustration.svg'; // add your SVG or Lottie file here

export default function Hero() {
  return (
    <motion.section
      id="hero"
      className="bg-bgLight text-text py-20"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      <div className="max-w-5xl mx-auto px-6 flex flex-col-reverse md:flex-row items-center">
        {/* Text content */}
        <div className="w-full md:w-1/2 space-y-6">
          <h1 className="text-4xl md:text-5xl font-extrabold">
            Find Your Perfect Roommate
          </h1>
          <p className="text-lg md:text-xl">
            RooMatch helps you connect with like-minded housemates in minutes.  
            Create your profile, browse listings, and match up seamlessly.
          </p>
          <a
            href="#auth"
            className="inline-block bg-primary text-white px-6 py-3 rounded-lg shadow hover:bg-primary/90 transition"
          >
            Get Started
          </a>
        </div>

        {/* Illustration */}
        <div className="w-full md:w-1/2 mb-10 md:mb-0 flex justify-center">
          <img
            src={heroIllustration}
            alt="People connecting over housing"
            className="w-3/4 md:w-full"
          />
        </div>
      </div>
    </motion.section>
  );
}
