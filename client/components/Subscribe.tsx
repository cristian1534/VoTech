"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fadeIn } from "../helpers/variants";
import { useForm } from "react-hook-form";
import { TNewsLetter } from "../types/typeNewsLetter";
import axios from "axios";
import { FiMail, FiCheckCircle, FiAlertCircle } from "react-icons/fi";

export function Subscribe() {
  const [error, setError] = useState<string | null>();
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TNewsLetter>();

  const onSubmit = async (data: { email: string }) => {
    try {
      setIsLoading(true);

      await axios.post(`${process.env.URL_DEV}/newsletter`, data);
      reset();
      setMessage("Thank you for subscribing!");

      setTimeout(() => {
        setMessage("");
      }, 2000);
      setIsLoading(false);
    } catch (error: unknown) {
      let errorMessage = "An unexpected error occurred.";

      if (error instanceof Error) {
        errorMessage = error.message;
      }

      if (error && typeof error === "object" && "response" in error) {
        const axiosError = error as {
          response?: { data?: { message?: string } };
        };
        errorMessage = axiosError.response?.data?.message || errorMessage;
      }

      setError(errorMessage);
      setIsLoading(false);

      setTimeout(() => {
        setError(null);
      }, 2000);
    }
  };

  return (
    <div className="py-16 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 shadow-xl rounded-lg font-sans">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <motion.h4
          className="text-3xl md:text-5xl lg:text-6xl font-extrabold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent mb-6"
          variants={fadeIn({ direction: "up", delay: 0.3 })}
          initial="hidden"
          whileInView={"show"}
          viewport={{ once: true, amount: 0.3 }}
        >
          Join Our Community
        </motion.h4>
        <motion.p 
          className="text-gray-400 mb-12 text-lg md:text-xl max-w-2xl mx-auto"
          variants={fadeIn({ direction: "up", delay: 0.4 })}
          initial="hidden"
          whileInView={"show"}
          viewport={{ once: true, amount: 0.3 }}
        >
          Stay ahead with the latest updates, exclusive content, and community insights delivered straight to your inbox.
        </motion.p>

        <AnimatePresence>
          {(message || error) && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`${
                error ? "bg-red-500/10 border-red-500" : "bg-green-500/10 border-green-500"
              } border text-white p-4 rounded-lg mb-8 mx-auto max-w-md flex items-center justify-center gap-2`}
            >
              {error ? <FiAlertCircle className="text-red-500" /> : <FiCheckCircle className="text-green-500" />}
              <span className={error ? "text-red-500" : "text-green-500"}>
                {error || message}
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col md:flex-row items-center gap-4 max-w-2xl mx-auto"
          variants={fadeIn({ direction: "up", delay: 0.5 })}
          initial="hidden"
          whileInView={"show"}
          viewport={{ once: true, amount: 0.3 }}
        >
          <div className="flex-1 w-full relative">
            <div className="relative">
              <FiMail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                id="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                    message: "This email is not valid",
                  },
                })}
                placeholder="Enter your email"
                className="w-full px-12 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-yellow-400/50 focus:border-yellow-400 text-gray-200 placeholder-gray-500 transition-all duration-300"
              />
            </div>
            {errors.email && (
              <motion.span 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-orange-500 block mt-2 text-sm"
              >
                {errors.email.message}
              </motion.span>
            )}
          </div>
          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-orange-500 hover:to-yellow-400 text-white rounded-lg font-medium shadow-lg shadow-orange-500/20 transition-all duration-300 whitespace-nowrap"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 border-t-2 border-white rounded-full animate-spin" />
                <span>Subscribing...</span>
              </div>
            ) : (
              "Subscribe Now"
            )}
          </motion.button>
        </motion.form>
      </div>
    </div>
  );
}
