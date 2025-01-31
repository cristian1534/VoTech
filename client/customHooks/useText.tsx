"use client"
import React from "react";
import { TMessage } from '../types/typeMessages';
import { motion } from "framer-motion";
import { fadeIn } from "../helpers/variants";

export const UseText = ({ messageOne, messageTwo, messageThree, messageFour }: TMessage) => {
  return (
    <motion.div
      variants={fadeIn({ direction: "up", delay: 0.3 })}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.3 }}
      className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 font-sans"
    >
      <div className="container mx-auto px-4 relative z-10 py-16">
        <div className="flex flex-col items-center justify-center">
          <motion.h3
            variants={fadeIn({ direction: "right", delay: 0.3 })}
            className="text-3xl lg:text-4xl font-bold mb-6"
          >
            <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
              {messageOne}
            </span>
          </motion.h3>

          <motion.div
            variants={fadeIn({ direction: "left", delay: 0.5 })}
            className="text-xl text-gray-400 text-center max-w-3xl"
          >
            {messageTwo && (
              <span className="font-semibold text-orange-500">{messageTwo}</span>
            )}{" "}
            {messageThree}{" "}
            {messageFour && (
              <span className="font-semibold text-orange-500">{messageFour}</span>
            )}
          </motion.div>
        </div>
      </div>

      <div className="absolute top-0 right-0 -mt-16 -mr-16 w-64 h-64 bg-yellow-300 rounded-full opacity-20 transform rotate-45"></div>
      <div className="absolute bottom-0 left-0 -mb-16 -ml-16 w-64 h-64 bg-orange-300 rounded-full opacity-20 transform -rotate-45"></div>
    </motion.div>
  );
};
