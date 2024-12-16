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

      await axios.post("https://votech.onrender.com/newsletter", data);
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
    <div className="-mt-24 shadow-md rounded-lg overflow-hidden font-sans">
      <div className="items-center justify-between py-10 px-5 bg-white shadow-2xl rounded-lg mx-auto text-center">
        <div className="px-2 -mt-6">
          <div className="text-center">
            <motion.h4
              className="text-center my-5 text-2xl md:text-5xl lg:text-6xl font-extrabold bg-gradient-to-r from-orange-400 to-yellow-500 bg-clip-text text-transparent"
              variants={fadeIn({ direction: "right", delay: 0.3 })}
              initial="hidden"
              whileInView={"show"}
              viewport={{ once: false, amount: 0.3 }}
            >
              Newsletter
            </motion.h4>
            {message && (
              <div
                className={`${
                  error ? "bg-red-500" : "bg-green-500"
                } text-white p-2 rounded mb-4 mx-auto`}
                style={{
                  maxWidth: "240px", 
                }}
              >
                {message}
              </div>
            )}
            <div className="w-full text-center">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="max-w-sm mx-auto p-1 pr-0 flex flex-col items-center">
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
                    placeholder="@email..."
                    className="w-full px-4 py-2 border-b-2 border-gray-300 focus:ring-0 focus:outline-none focus:border-yellow-400"
                  />
                  {errors.email && (
                    <span className="text-orange-500">
                      {errors.email.message}
                    </span>
                  )}
                </div>
                <div className="flex flex-col justify-center items-center">
                  <button
                    type="submit"
                    className="mt-4 text-white px-24 py-3 bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-orange-500 hover:to-yellow-400 transition-colors rounded-lg font-medium shadow-lg shadow-orange-300"
                  >
                    {isLoading ? "Sending..." : "Send"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
