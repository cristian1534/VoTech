"use client"
import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";
import { BiArrowBack } from "react-icons/bi";

export const BackButton = () => {
  return (
    <div className="font-sans container flex justify-end w-full mb-6 px-4">
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-orange-400 hover:text-orange-300 border border-orange-500/20 transition-all duration-300 rounded-lg font-medium shadow-lg shadow-orange-500/10 backdrop-blur-sm"
        >
          <BiArrowBack className="text-xl" />
          <span>Back</span>
        </Link>
      </motion.div>
    </div>
  );
};
