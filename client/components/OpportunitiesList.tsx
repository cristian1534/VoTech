"use client"
import React from "react";
import { Pricing } from "./Pricing";
import { motion } from "framer-motion";
import { fadeIn } from "../helpers/variants";

export const OpportunitiesList = () => {
  const headline = "Become Part of Our Developer Community";
  const subheading =
    "Discover opportunities to collaborate on impactful projects and grow your skills.";
  const opportunities = [
    "Exclusive access to real projects.",
    "Networking opportunities with other professionals.",
    "A chance to learn and grow through collaboration.",
  ];

  return (
    <motion.div 
      className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-16c font-sans"
      variants={fadeIn({ direction: "up", delay: 0.2 })}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.3 }}
    >
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className="flex flex-col items-center justify-center max-w-4xl mx-auto"
          variants={fadeIn({ direction: "up", delay: 0.3 })}
        >
          <h1 className="mt-4 text-2xl md:text-5xl font-bold text-center mb-6 bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
            {headline}
          </h1>
          <h2 className="text-xl md:text-2xl text-center text-gray-300 mb-12">
            {subheading}
          </h2>
          <motion.ul 
            className="space-y-4 mb-16"
            variants={fadeIn({ direction: "up", delay: 0.4 })}
          >
            {opportunities.map((opportunity, index) => (
              <motion.li 
                key={index}
                className="flex items-center text-lg md:text-xl text-gray-300 pl-4"
                variants={fadeIn({ direction: "right", delay: 0.2 * index })}
              >
                <span className="w-2 h-2 bg-orange-400 rounded-full mr-4"></span>
                {opportunity}
              </motion.li>
            ))}
          </motion.ul>
          <motion.div 
            className="w-full"
            variants={fadeIn({ direction: "up", delay: 0.5 })}
          >
            <Pricing />
          </motion.div>
        </motion.div>
      </div>

      <div className="absolute top-0 right-0 -mt-16 -mr-16 w-64 h-64 bg-yellow-300 rounded-full opacity-20 transform rotate-45"></div>
      <div className="absolute bottom-0 left-0 -mb-16 -ml-16 w-64 h-64 bg-orange-300 rounded-full opacity-20 transform -rotate-45"></div>
    </motion.div>
  );
};

