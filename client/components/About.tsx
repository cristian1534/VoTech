'use client';
import React from 'react';

export const About = () => {
  return (
    <section className="flex flex-col items-center justify-center py-12 px-4 bg-white shadow-2xl font-sans rounded-sm">
      <div className="max-w-screen-lg mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-extrabold text-transparent bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text">
          Why VoTech?
        </h2>
        <p className="mt-6 text-lg md:text-xl font-medium text-gray-400">
          <strong className='text-orange-400'>VoTech</strong> is an innovative platform designed for junior developers who want to test their skills, connect with other talents, and stand out to potential recruiters. Users can propose projects, vote on the best ideas, and subscribe to actively participate in the development of impactful projects. Additionally, VoTech offers a unique space to showcase their work, allowing projects to be seen by companies looking to hire new developers.
        </p>
        <p className="mt-4 text-lg md:text-xl font-medium text-gray-400">
          Whether you are looking to improve your skills through real-world projects, expand your professional network, or gain visibility with recruiters, <strong className='text-orange-400'>VoTech</strong> is the perfect place to boost your career as a developer.
        </p>
      </div>
    </section>
  );
};

