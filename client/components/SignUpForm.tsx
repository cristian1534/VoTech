"use client";

import React, { useState } from "react";
import { BiShow } from "react-icons/bi";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import { TUser } from "../types/typeUser";
import { motion } from "framer-motion";
import { fadeIn } from "../helpers/variants";

export const SignUpForm: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string>();
  const [message, setMessage] = useState("");
  const [, setUser] = useState({});
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TUser>();

  const onSubmit = async (data: TUser): Promise<void> => {
    try {
      setIsLoading(true);
      setUser(data);
      await axios.post(`${process.env.NEXT_PUBLIC_URL_DEV}/users`, data);
      reset();
      setIsLoading(false);
      setMessage("User registered successfully!");
      setTimeout(() => {
        router.push("/signin");
      }, 1500);
    } catch (error: unknown) {
      setIsLoading(false);
      let message = "An unexpected error occurred.";

      if (error instanceof Error) {
        message = error.message;
      }

      if (error && typeof error === "object" && "response" in error) {
        const axiosError = error as {
          response?: { data?: { message?: string } };
        };
        setError(axiosError.response?.data?.message);
        const errorResponse = axiosError.response;
        message =
          errorResponse?.data?.message ||
          JSON.stringify(errorResponse?.data) ||
          message;
      }

      setMessage(message);
    }
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 p-6 font-sans">
      <div className="w-full max-w-lg bg-white p-8 rounded-lg shadow-lg">
        <motion.h2
          className="text-center my-6 text-4xl md:text-5xl lg:text-6xl font-extrabold bg-gradient-to-r from-orange-400 to-yellow-500 bg-clip-text text-transparent"
          variants={fadeIn({ direction: "right", delay: 0.3 })}
          initial="hidden"
          whileInView={"show"}
          viewport={{ once: false, amount: 0.7 }}
        >
          Join Us Now!
        </motion.h2>
        {message && (
          <div
            className={`${
              error ? "bg-red-500" : "bg-green-500"
            } text-white p-2 rounded mb-4 text-center`}
          >
            {message}
          </div>
        )}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-400"
            >
              Your Name
            </label>
            <input
              type="text"
              id="name"
              {...register("name", { required: "Name is required" })}
              className="w-full px-4 py-2 border-b-2 border-gray-300 focus:ring-0 focus:outline-none focus:border-yellow-400 text-gray-400"
            />
            {errors.name && (
              <span className="text-orange-500">{errors.name.message}</span>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-400"
            >
              Your Email
            </label>
            <input
              type="email"
              id="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                  message: "This email is not valid",
                },
              })}
              className="w-full px-4 py-2 border-b-2 border-gray-300 focus:ring-0 focus:outline-none focus:border-yellow-400 text-gray-400"
            />
            {errors.email && (
              <span className="text-orange-500">{errors.email.message}</span>
            )}
          </div>
          <div className="mb-4">
            <div className="flex items-center text-gray-400">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-400"
              >
                Password (min 8 characters)
              </label>
              <BiShow
                className="ml-auto cursor-pointer"
                size={20}
                onClick={handleShowPassword}
              />
            </div>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
              className="w-full px-4 py-2 border-b-2 border-gray-300 focus:ring-0 focus:outline-none focus:border-yellow-400 text-gray-400"
            />
            {errors.password && (
              <span className="text-orange-500">{errors.password.message}</span>
            )}
          </div>
          <div className="flex justify-center items-center">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-4 text-white px-6 py-3 bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-orange-500 hover:to-yellow-400 transition-colors rounded-lg font-medium shadow-lg shadow-orange-300"
            >
              {isLoading ? "Sending..." : "Send"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
