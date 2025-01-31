"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { fadeIn } from "../helpers/variants";
import { useForm } from "react-hook-form";
import { TContact } from "../types/typeContact";
import Link from "next/link";

const ContactForm: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>();
  const [response, setResponse] = useState<string>("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TContact>();

  const onSubmit = async (data: TContact): Promise<void> => {
    try {
      setIsLoading(true);
      await fetch(`${process.env.NEXT_PUBLIC_URL_DEV}/contacts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      reset();
      setIsLoading(false);
      setTimeout(() => {
        setResponse("Thank you for your message! We will contact you soon.");
        setTimeout(() => {
          setResponse("");
        }, 5000);
      }, 1000);
    } catch (error: unknown) {
      setIsLoading(false);
      let errorResult = "An unexpected error occurred.";

      if (error instanceof Error) {
        errorResult = error.message;
      }

      if (error && typeof error === "object" && "response" in error) {
        const axiosError = error as {
          response?: { data?: { message?: string } };
        };
        setError(axiosError.response?.data?.message);
        const errorResponse = axiosError.response;
        errorResult =
          errorResponse?.data?.message ||
          JSON.stringify(errorResponse?.data) ||
          errorResult;
      }

      setResponse(errorResult);
    }
  };

  return (
    <motion.div
      className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-16 font-sans"
      variants={fadeIn({ direction: "up", delay: 0.2 })}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.3 }}
    >
      <div className="container max-w-6xl mx-auto px-4 relative z-10">
        <motion.div
          className="flex flex-col lg:flex-row gap-8"
          variants={fadeIn({ direction: "up", delay: 0.3 })}
        >
          <div className="w-full lg:w-3/5 bg-gray-800/50 backdrop-blur-sm p-8 rounded-xl border border-gray-700/50">
            <motion.h2 
              className="text-3xl md:text-4xl font-bold text-center mb-8 bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent"
              variants={fadeIn({ direction: "down", delay: 0.4 })}
            >
              Still thinking about?
            </motion.h2>

            {response && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`${
                  error ? "bg-red-500/10 border-red-500/50" : "bg-green-500/10 border-green-500/50"
                } border text-${error ? "red" : "green"}-400 p-4 rounded-lg mb-6 text-center`}
              >
                {response}
              </motion.div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-2">
                <label className="text-gray-300 text-sm">Your Name</label>
                <input
                  {...register("name", { required: "Name is required" })}
                  className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-lg focus:outline-none focus:border-orange-500 text-gray-200"
                  placeholder="Enter your name"
                />
                {errors.name && (
                  <span className="text-orange-400 text-sm">{errors.name.message}</span>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-gray-300 text-sm">Your Email</label>
                <input
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                      message: "Invalid email address",
                    },
                  })}
                  className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-lg focus:outline-none focus:border-orange-500 text-gray-200"
                  placeholder="Enter your email"
                />
                {errors.email && (
                  <span className="text-orange-400 text-sm">{errors.email.message}</span>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-gray-300 text-sm">Your Message</label>
                <textarea
                  {...register("message", { required: "Message is required" })}
                  className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-lg focus:outline-none focus:border-orange-500 text-gray-200 h-32 resize-none"
                  placeholder="Type your message here..."
                />
                {errors.message && (
                  <span className="text-orange-400 text-sm">{errors.message.message}</span>
                )}
              </div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-4 bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-orange-500 hover:to-yellow-400 text-white rounded-lg font-medium shadow-lg shadow-orange-500/20 transition-all duration-300"
              >
                {isLoading ? "Sending..." : "Send Message"}
              </motion.button>
            </form>
          </div>

          <motion.div
            className="w-full lg:w-2/5 bg-gray-800/50 backdrop-blur-sm p-8 rounded-xl border border-gray-700/50"
            variants={fadeIn({ direction: "left", delay: 0.5 })}
          >
            <h2 className="text-2xl md:text-3xl font-bold text-center bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent mb-6">
              Start Your Freelance Journey!
            </h2>
            <div className="space-y-4 text-gray-300 text-center">
              <p className="text-xl">💻 Take your first step into freelancing! 🚀</p>
              <ul className="space-y-3">
                <li className="flex items-center gap-2 justify-center">
                  <span className="text-green-400">✓</span> Remote projects
                </li>
                <li className="flex items-center gap-2 justify-center">
                  <span className="text-green-400">✓</span> Build your portfolio
                </li>
                <li className="flex items-center gap-2 justify-center">
                  <span className="text-green-400">✓</span> Gain real-world experience
                </li>
              </ul>
              <p className="text-orange-400">🌟 Passion for coding is all you need!</p>
              <p>📩 Apply now and grow with us.</p>
            </div>

            <motion.div 
              className="mt-8 flex justify-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                href="/jobs"
                className="px-8 py-4 bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-orange-500 hover:to-yellow-400 text-white rounded-lg shadow-lg shadow-orange-500/20 transition-all duration-300"
              >
                Explore Jobs
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      <div className="absolute top-0 right-0 -mt-16 -mr-16 w-64 h-64 bg-yellow-300 rounded-full opacity-20 transform rotate-45"></div>
      <div className="absolute bottom-0 left-0 -mb-16 -ml-16 w-64 h-64 bg-orange-300 rounded-full opacity-20 transform -rotate-45"></div>
    </motion.div>
  );
};

export default ContactForm;
