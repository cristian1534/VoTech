"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { fadeIn } from "../helpers/variants";
import { useForm } from "react-hook-form";
import { TNewsLetter } from "../types/typeNewsLetter";
import axios from "axios";

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
    <div className="py-12 bg-gradient-to-br from-white via-orange-100 to-yellow-50 shadow-md rounded-sm font-sans">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <motion.h4
          className="text-3xl md:text-5xl lg:text-6xl font-extrabold bg-gradient-to-r from-orange-400 to-yellow-500 bg-clip-text text-transparent mb-6"
          variants={fadeIn({ direction: "up", delay: 0.3 })}
          initial="hidden"
          whileInView={"show"}
          viewport={{ once: true, amount: 0.3 }}
        >
          Stay Updated with Our Newsletter
        </motion.h4>
        <p className="text-gray-400 mb-8 text-lg md:text-xl">
          Join our mailing list and never miss an update. We bring you the latest insights and news straight to your inbox.
        </p>

        {message && (
          <div
            className={`${
              error ? "bg-red-500" : "bg-green-500"
            } text-white p-3 rounded-lg mb-6 mx-auto max-w-md`}
          >
            {message}
          </div>
        )}

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col md:flex-row items-center gap-4"
        >
          <div className="flex-1">
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
              className="w-full px-4 py-2 border-b-2 border-gray-300 focus:ring-0 focus:outline-none focus:border-yellow-400 text-gray-400"
            />
            {errors.email && (
              <span className="text-orange-500 block mt-1 text-sm">
                {errors.email.message}
              </span>
            )}
          </div>
          <button
            type="submit"
            className="px-8 py-3 bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-orange-500 hover:to-yellow-400 text-white rounded-lg font-medium shadow-lg shadow-orange-200 transition-all duration-300"
          >
            {isLoading ? "Sending..." : "Subscribe"}
          </button>
        </form>
      </div>
    </div>
  );
}
