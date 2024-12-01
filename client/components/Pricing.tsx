"use client";
import Link from "next/link";
import React from "react";
import { FaCcPaypal } from "react-icons/fa6";
import { motion } from "framer-motion";

export const Pricing = () => {
  return (
    <div>
      <div className="relative text-gray-300" id="pricing">
        <div
          aria-hidden="true"
          className="absolute inset-0 h-max w-full m-auto grid grid-cols-2 -space-x-52 opacity-20"
        ></div>
        <div className="max-w-7xl mx-auto px-6 md:px-12 xl:px-6">
          <div className="mb-10 space-y-4 px-6 md:px-0">
            <h2 className="text-center text-2xl font-bold text-white sm:text-3xl md:text-4xl">
              Pricing
            </h2>
          </div>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <motion.div
              className="flex flex-col items-center aspect-auto p-4 sm:p-8 rounded-3xl bg-gradient-to-r from-yellow-300 to-orange-400 shadow-orange-300 shadow-lg m-2 flex-1 max-w-md"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{
                scale: 1.05,
                boxShadow: "0 15px 30px rgba(0, 0, 0, 0.3)",
              }}
              transition={{
                duration: 0.5,
                type: "spring",
                stiffness: 300,
                damping: 20,
              }}
            >
              <h2 className="text-lg sm:text-xl font-medium text-white mb-2">
                Awesome Pricing
              </h2>
              <p className="text-white text-lg sm:text-xl text-center mb-6 mt-4">
                <span className="text-3xl sm:text-4xl font-bold text-white">
                  U$D 5
                </span>{" "}
                / Month
              </p>
              <div className="flex items-center justify-center text-white p-1">
                <FaCcPaypal size={100} />
              </div>

              <p className="text-white text-center mb-6 space-y-3">
                Create a Project Idea.
                <br />
                Vote for any project to develop.
                <br />
                Publish information about the project built.
                <br />
                Access to our community.
                <br />
                Show your project information as your Portfolio.
              </p>
              <Link
                target="_blank"
                href="https://www.sandbox.paypal.com/ncp/payment/8F9AZY58Z77J6"
                rel="noreferrer"
                className="relative flex h-9 w-full items-center justify-center px-4 before:absolute before:inset-0 before:rounded-full before:bg-white before:transition before:duration-300 hover:before:scale-110 active:duration-75 active:before:scale-95 sm:w-max"
              >
                <span className="relative text-lg font-semibold text-orange-300">
                  Pay with PayPal
                </span>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};
