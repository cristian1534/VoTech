'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { FiCode, FiUsers, FiTrendingUp } from 'react-icons/fi';

export const About = () => {
  const features = [
    {
      icon: <FiCode className="w-8 h-8" />,
      title: "Skill Development",
      description: "Test and improve your development skills through real-world projects"
    },
    {
      icon: <FiUsers className="w-8 h-8" />,
      title: "Community Connection",
      description: "Connect with other talented developers and build your network"
    },
    {
      icon: <FiTrendingUp className="w-8 h-8" />,
      title: "Career Growth",
      description: "Gain visibility with recruiters and showcase your work"
    }
  ];

  return (
    <motion.section
      className="flex flex-col items-center justify-center py-20 px-4 bg-gradient-to-b from-gray-900 to-gray-800 font-sans"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="max-w-screen-xl mx-auto text-center">
        <motion.h2
          className="text-4xl md:text-5xl font-extrabold text-transparent bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text mb-8"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        >
          Why Choose VoTech?
        </motion.h2>

        <motion.div
          className="max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <p className="text-lg md:text-xl font-medium text-gray-300 leading-relaxed">
            <strong className='text-orange-400'>VoTech</strong> is an innovative platform designed for junior developers who want to test their skills, connect with other talents, and stand out to potential recruiters.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="p-6 rounded-xl bg-gray-800/50 border border-gray-700 hover:border-orange-500/50 transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 * (index + 1) }}
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 20px 40px rgba(0, 0, 0, 0.2)"
              }}
            >
              <div className="text-orange-400 mb-4 flex justify-center">{feature.icon}</div>
              <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.p 
          className="text-lg md:text-xl font-medium text-gray-300 max-w-3xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          Whether you're looking to improve your skills through real-world projects, expand your professional network, or gain visibility with recruiters, <strong className='text-orange-400'>VoTech</strong> is the perfect place to boost your career as a developer.
        </motion.p>
      </div>
    </motion.section>
  );
};


