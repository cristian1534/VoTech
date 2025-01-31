"use client";
import React from "react";
import { motion } from "framer-motion";
import { fadeIn } from "../helpers/variants";

export const Discord = () => {
  return (
    <motion.div
      className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-16 font-sans"
      variants={fadeIn({ direction: "up", delay: 0.3 })}
      initial="hidden"
      whileInView={"show"}
      viewport={{ once: false, amount: 0.3 }}
    >
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className="max-w-4xl mx-auto"
          variants={fadeIn({ direction: "up", delay: 0.4 })}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-center bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent mb-8">
            Join Our VoTech Community on Discord! 🚀
          </h2>
          <div className="space-y-6 text-gray-300">
            <p className="text-lg md:text-xl text-center">
              Are you a junior developer eager to improve your skills and connect
              with other talents? Then our Discord community is the perfect place
              for you! 🎯
            </p>
            <p className="text-lg md:text-xl text-center">
              At VoTech, we believe that collaboration and continuous learning are
              key to professional growth. By joining our community, you will get
              access to:
            </p>
            <ul className="space-y-4 text-lg md:text-xl pl-4">
              <motion.li 
                className="flex items-start gap-3"
                variants={fadeIn({ direction: "right", delay: 0.5 })}
              >
                <span className="text-2xl">🌟</span>
                <span>Spaces to share your projects and get feedback from other developers.</span>
              </motion.li>
              <motion.li 
                className="flex items-start gap-3"
                variants={fadeIn({ direction: "right", delay: 0.6 })}
              >
                <span className="text-2xl">🗳️</span>
                <span>Challenges and voting on project ideas to help you put what you have learned into practice.</span>
              </motion.li>
              <motion.li 
                className="flex items-start gap-3"
                variants={fadeIn({ direction: "right", delay: 0.7 })}
              >
                <span className="text-2xl">📚</span>
                <span>Resources and tutorials to enhance your development skills.</span>
              </motion.li>
              <motion.li 
                className="flex items-start gap-3"
                variants={fadeIn({ direction: "right", delay: 0.8 })}
              >
                <span className="text-2xl">🤝</span>
                <span>Networking opportunities to connect with recruiters and other professionals in the industry.</span>
              </motion.li>
            </ul>
            <p className="text-lg md:text-xl text-center">
              Whether you are an expert or just starting out, you will find a
              friendly and supportive environment to grow, learn, and showcase your
              work to those who value it the most.
            </p>
            <p className="text-lg md:text-xl text-center">
              Grow your career with us and become part of a vibrant developer
              community!
            </p>
            <motion.div 
              className="flex justify-center mt-8"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <a
                href="https://discord.gg/g3UrMcSE"
                className="px-8 py-4 bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-orange-500 hover:to-yellow-400 text-white rounded-xl font-medium shadow-lg shadow-orange-500/20 transition-all duration-300 text-lg"
              >
                👉 Join us on Discord
              </a>
            </motion.div>
          </div>
        </motion.div>
      </div>

      <div className="absolute top-0 right-0 -mt-16 -mr-16 w-64 h-64 bg-yellow-300 rounded-full opacity-20 transform rotate-45"></div>
      <div className="absolute bottom-0 left-0 -mb-16 -ml-16 w-64 h-64 bg-orange-300 rounded-full opacity-20 transform -rotate-45"></div>
    </motion.div>
  );
};
