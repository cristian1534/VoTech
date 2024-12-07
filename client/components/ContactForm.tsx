"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { fadeIn } from "../helpers/variants";
import { useForm } from "react-hook-form";
import { TContact } from "../types/typeContact";

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
      await fetch("https://votech.onrender.com/contacts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      reset();
      setIsLoading(false);
      setTimeout(() =>{
        setResponse("Thank you for your message! We will contact you soon.")
        setTimeout(()=>{
          setResponse("")
        },5000)
      },1000)


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
    <div className="flex justify-center items-center min-h-screen font-sans">
      <div className="w-full max-w-lg bg-white p-8 rounded-lg shadow-2xl">
        <motion.p
          className="text-center my-5 text-2xl md:text-5xl lg:text-6xl font-extrabold bg-gradient-to-r from-orange-400 to-yellow-500 bg-clip-text text-transparent"
          variants={fadeIn({ direction: "right", delay: 0.3 })}
          initial="hidden"
          whileInView={"show"}
          viewport={{ once: false, amount: 0.3 }}
        >
          Still thinking about?
        </motion.p>

        {response && (
          <div
            className={`${
              error ? "bg-red-500" : "bg-green-500"
            } text-white p-2 rounded mb-4 text-center`}
          >
            {response}
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
            <label
              htmlFor="messages"
              className="block text-sm font-medium text-gray-400"
            >
              Your Message
            </label>
            <input
              type="text"
              id="message"
              {...register("message", { required: "Message is required" })}
              className="w-full px-4 py-2 border-b-2 border-gray-300 focus:ring-0 focus:outline-none focus:border-yellow-400 text-gray-400"
            />
            {errors.name && (
              <span className="text-orange-500">{errors.message?.message}</span>
            )}
          </div>
          <div className="flex justify-center items-center">
            <button
              type="submit"
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

export default ContactForm;
