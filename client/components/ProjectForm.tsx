"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { TProject } from "../types/typeProjects";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useSession } from "../context/SessionContext";
import { motion } from "framer-motion";
import { BiImage, BiCode, BiDetail, BiText } from "react-icons/bi";

export const CreateProjectForm: React.FC = () => {
  const [error, setError] = useState<string | null>();
  const [message, setMessage] = useState<string>();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { sessionToken: token } = useSession();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TProject>();

  const onSubmit = async (data: TProject): Promise<void> => {
    try {
      setIsLoading(true);
      
      const technologies = typeof data.technologies === "string"
        ? data.technologies.split(',').map(tech => tech.trim()) 
        : data.technologies;
  
      const projectData = { ...data, technologies };
  
      await axios.post<TProject>(`${process.env.NEXT_PUBLIC_URL_DEV}/projects`, projectData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      reset();
      router.push("/");
      setIsLoading(false);
    } catch (error: unknown) {
      console.log(error)
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
    <div className="font-sans min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-20 px-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl mx-auto"
      >
        <div className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-2xl border border-gray-700/50 shadow-xl">
          <h2 className="text-center mb-8 text-4xl font-bold bg-gradient-to-r from-orange-400 to-yellow-500 bg-clip-text text-transparent">
            Share Your Project
          </h2>

          {message && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`${
                error ? "bg-red-500/10 border-red-500/50 text-red-400" : "bg-green-500/10 border-green-500/50 text-green-400"
              } border p-4 rounded-xl mb-6 text-center`}
            >
              {message}
            </motion.div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-gray-300">
                <BiText className="text-xl" />
                <span>Project Name</span>
              </label>
              <input
                type="text"
                {...register("name", { required: "Name is required" })}
                className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-xl focus:outline-none focus:border-orange-500 text-gray-200"
                placeholder="Enter project name"
              />
              {errors.name && (
                <span className="text-orange-400 text-sm">{errors.name.message}</span>
              )}
            </div>

            <div className="space-y-2">
              <label className="flex items-center gap-2 text-gray-300">
                <BiDetail className="text-xl" />
                <span>Project Description</span>
              </label>
              <textarea
                {...register("description", { required: "Description is required" })}
                className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-xl focus:outline-none focus:border-orange-500 text-gray-200 min-h-[120px]"
                placeholder="Describe your project"
              />
              {errors.description && (
                <span className="text-orange-400 text-sm">{errors.description.message}</span>
              )}
            </div>

            <div className="space-y-2">
              <label className="flex items-center gap-2 text-gray-300">
                <BiCode className="text-xl" />
                <span>Technologies</span>
              </label>
              <input
                type="text"
                {...register("technologies", { required: "Technologies are required" })}
                className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-xl focus:outline-none focus:border-orange-500 text-gray-200"
                placeholder="React, Node.js, Docker (comma separated)"
              />
              {errors.technologies && (
                <span className="text-orange-400 text-sm">{errors.technologies.message}</span>
              )}
            </div>

            <div className="space-y-2">
              <label className="flex items-center gap-2 text-gray-300">
                <BiImage className="text-xl" />
                <span>Project Image URL</span>
              </label>
              <input
                type="url"
                {...register("image", { required: "Image URL is required" })}
                className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-xl focus:outline-none focus:border-orange-500 text-gray-200"
                placeholder="https://example.com/image.jpg"
              />
              {errors.image && (
                <span className="text-orange-400 text-sm">{errors.image.message}</span>
              )}
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isLoading}
              className="w-full py-4 bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-orange-500 hover:to-yellow-400 text-white rounded-xl font-medium shadow-lg shadow-orange-500/20 transition-all duration-300 disabled:opacity-50"
            >
              {isLoading ? "Creating Project..." : "Create Project"}
            </motion.button>
          </form>
        </div>
      </motion.div>
    </div>
  );
};
