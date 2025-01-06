"use client";
import React from "react";
import { motion } from "framer-motion";
import { fadeIn } from "../helpers/variants";

export const Discord = () => {
  return (
    <motion.div
      className="flex flex-col items-center justify-center py-12 px-4 bg-white font-sans container mx-auto shadow-2xl"
      variants={fadeIn({ direction: "up", delay: 0.3 })}
      initial="hidden"
      whileInView={"show"}
      viewport={{ once: false, amount: 0.3 }}
      whileHover={{
        boxShadow: "0 10px 20px rgba(0, 0, 0, 0.45)",
        transition: { type: "spring", stiffness: 300, damping: 20 },
      }}
    >
      <div className="max-w-screen-lg mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-extrabold text-transparent bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text">
          Join Our VoTech Community on Discord! 🚀
        </h2>
        <p className="mt-6 text-lg md:text-xl font-medium text-gray-400">
          Are you a junior developer eager to improve your skills and connect
          with other talents? Then our Discord community is the perfect place
          for you! 🎯
        </p>
        <p className="mt-4 text-lg md:text-xl font-medium text-gray-400">
          At VoTech, we believe that collaboration and continuous learning are
          key to professional growth. By joining our community, you will get
          access to:
        </p>
        <ul className="mt-4 text-lg md:text-xl font-medium text-gray-400 list-inside list-disc">
          <li>
            🌟 **Spaces to share your projects** and get feedback from other
            developers.
          </li>
          <li>
            🗳️ **Challenges and voting** on project ideas to help you put what
            you’ve learned into practice.
          </li>
          <li>
            📚 **Resources and tutorials** to enhance your development skills.
          </li>
          <li>
            🤝 **Networking opportunities** to connect with recruiters and other
            professionals in the industry.
          </li>
        </ul>
        <p className="mt-4 text-lg md:text-xl font-medium text-gray-400">
          Whether you are an expert or just starting out, you will find a
          friendly and supportive environment to grow, learn, and showcase your
          work to those who value it the most.
        </p>
        <p className="mt-4 text-lg md:text-xl font-medium text-gray-400">
          Grow your career with us and become part of a vibrant developer
          community!
        </p>
        <a
          href="https://discord.gg/g3UrMcSE"
          className="mt-6 inline-block text-white px-6 py-4 bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-orange-500 hover:to-yellow-400 transition-colors rounded-lg font-medium shadow-lg shadow-orange-300"
        >
          👉 **JOIN US ON DISCORD**
        </a>
      </div>
    </motion.div>
  );
};
