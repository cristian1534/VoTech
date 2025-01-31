"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { TUpload } from "../types/typeUpload";
import axios from "axios";
import { motion } from "framer-motion";
import { BiImage, BiCode, BiDetail, BiText, BiGroup, BiLink, BiGitBranch } from "react-icons/bi";

export const UploadForm = () => {
  const [error, setError] = useState<string | null>();
  const [message, setMessage] = useState<string>();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TUpload>();

  const onSubmit = async (data: TUpload): Promise<void> => {
    try {
      setIsLoading(true);
  
      const technologies = typeof data.technologies === "string"
        ? data.technologies.split(',').map(tech => tech.trim()) 
        : data.technologies;

      const members = typeof data.members === "string"
      ? data.members.split(',').map(member => member.trim())
      : data.members;
  
      const projectData = { ...data, technologies, members };
  
      await axios.post<TUpload>(`${process.env.NEXT_PUBLIC_URL_DEV}/portfolio`, projectData);
      
      reset();
      setIsLoading(false);
      setMessage("Project shared successfully");
      
      setTimeout(() => {
        setMessage("");
      }, 1000);
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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-20 px-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl mx-auto"
      >
        <div className="font-sans bg-gray-800/50 backdrop-blur-sm p-8 rounded-2xl border border-gray-700/50 shadow-xl">
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
            {[
              { icon: BiText, label: "Project Title", name: "title", type: "text" },
              { icon: BiDetail, label: "Project Description", name: "description", type: "textarea" },
              { icon: BiCode, label: "Technologies", name: "technologies", type: "text", placeholder: "React, Node.js, Docker" },
              { icon: BiGroup, label: "Team Members", name: "members", type: "text" },
              { icon: BiLink, label: "Deployment URL", name: "deployment", type: "url", placeholder: "https://..." },
              { icon: BiGitBranch, label: "GitHub URL", name: "github", type: "url", placeholder: "https://..." },
              { icon: BiImage, label: "Project Image URL", name: "image", type: "url", placeholder: "https://example.com/image.jpg" },
            ].map(({ icon: Icon, label, name, type, placeholder }) => (
              <div key={name} className="space-y-2">
                <label className="flex items-center gap-2 text-gray-300">
                  <Icon className="text-xl" />
                  <span>{label}</span>
                </label>
                {type === "textarea" ? (
                  <textarea
                    {...register(name as keyof TUpload, { required: `${label} is required` })}
                    className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-xl focus:outline-none focus:border-orange-500 text-gray-200 min-h-[120px]"
                    placeholder={placeholder}
                  />
                ) : (
                  <input
                    type={type}
                    {...register(name as keyof TUpload, { required: `${label} is required` })}
                    className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-xl focus:outline-none focus:border-orange-500 text-gray-200"
                    placeholder={placeholder}
                  />
                )}
                {errors[name as keyof TUpload] && (
                  <span className="text-orange-400 text-sm">
                    {errors[name as keyof TUpload]?.message}
                  </span>
                )}
              </div>
            ))}

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isLoading}
              className="w-full py-4 bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-orange-500 hover:to-yellow-400 text-white rounded-xl font-medium shadow-lg shadow-orange-500/20 transition-all duration-300 disabled:opacity-50"
            >
              {isLoading ? "Uploading Project..." : "Upload Project"}
            </motion.button>
          </form>
        </div>
      </motion.div>
    </div>
  );
};
