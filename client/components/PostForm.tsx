"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Job } from "../types/typeJobs";
import axios from "axios";
import { useRouter } from "next/navigation";

export const PostForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<string>();
  const [error, setError] = useState<string | null>();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Job>();

  const onSubmit = async (data: Job): Promise<void> => {
    try {
      setIsLoading(true);
      await axios.post(`${process.env.NEXT_PUBLIC_URL_DEV}/jobs`, data);
      setMessage("Job posted successfully!");
      setError(null);
      reset();
      setTimeout(() => {
        router.push("/jobs");
      }, 1000)
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
        setTimeout(() => {
          setError(null);
          setMessage("");
        }, 2000);
      }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 p-6 font-sans">
      <div className="w-full max-w-lg bg-white p-8 rounded-lg shadow-2xl">
        <h2 className="text-center my-6 text-4xl md:text-5xl lg:text-6xl font-extrabold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
          Offering a Job?
        </h2>
        {message && (
          <div
            className={`${
              error ? "bg-red-500" : "bg-green-500"
            } text-white p-2 rounded mb-4 text-center`}
          >
            {message}
          </div>
        )}
        <form className="mb-10" onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-400"
            >
              Job Title
            </label>
            <input
              type="text"
              id="title"
              {...register("title", { required: "Title is required" })}
              className="w-full px-4 py-2 border-b-2 border-gray-300 focus:ring-0 focus:outline-none focus:border-orange-400 text-gray-400"
            />
            {errors.title && (
              <span className="text-orange-500">{errors.title.message}</span>
            )}
          </div>

          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-400"
            >
              Job Description
            </label>
            <textarea
              id="description"
              {...register("description", {
                required: "Description is required",
              })}
              className="w-full px-4 py-2 border-b-2 border-gray-300 focus:ring-0 focus:outline-none focus:border-orange-400  text-gray-400"
              style={{ resize: "none" }}
            />
            {errors.description && (
              <span className="text-orange-500">
                {errors.description.message}
              </span>
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
              id="contact"
              {...register("contact", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                  message: "This email is not valid",
                },
              })}
              className="w-full px-4 py-2 border-b-2 border-gray-300 focus:ring-0 focus:outline-none focus:border-yellow-400 text-gray-400"
            />
            {errors.contact && (
              <span className="text-orange-500">{errors.contact.message}</span>
            )}
          </div>

          <div className="flex justify-center items-center">
            <button
              type="submit"
              className="mt-4 text-white px-6 py-3 bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-orange-500 hover:to-yellow-400 transition-colors rounded-lg font-medium shadow-lg shadow-orange-300 w-full"
            >
              {isLoading ? "Sending..." : "Send"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
