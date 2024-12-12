"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { TProject } from "../types/typeProjects";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useSession } from "../context/SessionContext";

export const CreateProjectForm: React.FC = () => {
  const [error, setError] = useState<string | null>();
  const [message, setMessage] = useState("");
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
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
  
      await axios.post<TProject>("https://votech.onrender.com/projects", projectData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      reset();
      router.push("/");
      setIsLoading(false);
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
          Share your idea
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
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-400"
            >
              Project Name
            </label>
            <input
              type="text"
              id="name"
              {...register("name", { required: "Name is required" })}
              className="w-full px-4 py-2 border-b-2 border-gray-300 focus:ring-0 focus:outline-none focus:border-orange-400 text-gray-400"
            />
            {errors.name && (
              <span className="text-orange-500">{errors.name.message}</span>
            )}
          </div>

          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-400"
            >
              Project Description
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
              htmlFor="technologies"
              className="block text-sm font-medium text-gray-400"
            >
              Technologies
            </label>
            <input
              type="text"
              id="technologies"
              {...register("technologies", {
                required: "Technologies is required",
              })}
              placeholder="e.g., React, Node.js, Docker"
              className="w-full px-4 py-2 border-b-2 border-gray-300 focus:ring-0 focus:outline-none focus:border-orange-400  text-gray-400"
            />
            {errors.technologies && (
              <span className="text-orange-500">
                {errors.technologies.message}
              </span>
            )}
          </div>

          <div className="mb-4">
            <label
              htmlFor="imageUrl"
              className="block text-sm font-medium text-gray-400"
            >
              Project Image URL
            </label>
            <input
              type="url"
              id="imageUrl"
              {...register("image", { required: "Image URL is required" })}
              placeholder="https://example.com/image.jpg"
              className="w-full px-4 py-2 border-b-2 border-gray-300 focus:ring-0 focus:outline-none focus:border-orange-400  text-gray-400"
            />
            {errors.image && (
              <span className="text-orange-500">{errors.image.message}</span>
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
