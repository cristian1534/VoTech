"use client";
import Link from "next/link";
import React, { useState } from "react";
import { BiShow } from "react-icons/bi";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import { TAuth, TToken } from "../types/typeUser";
import { setSession } from "../customHooks/setSession";
import { useSession } from "../context/SessionContext"

export const SignInForm: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>();
  const [message, setMessage] = useState("");
  const [, setUser] = useState({});
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { setSessionToken, setSessionUser } = useSession();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<TAuth>();

  const onSubmit = async (data: TAuth): Promise<void> => {
    try {
      setIsLoading(true);
      setUser(data);
      const response = await axios.post<TToken>(
        "https://votech.onrender.com/users/auth",
        data
      );
      console.log(response);
      const token = response.data?.data?.token;
      if (token) {
        setSession(token);
        setSessionUser(response.data?.data.name)
      }
      reset();
      setIsLoading(false);
      setMessage("Welcome!");
      setTimeout(() => {
        router.push("/");
        setSessionToken(token);
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
      setTimeout(() => {
        setError(null);
        setMessage("");
      }, 2000);
    }
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 p-6 font-sans">
      <div className="w-full max-w-lg bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-center my-6 text-4xl md:text-5xl lg:text-6xl font-extrabold bg-gradient-to-r from-orange-400 to-yellow-500 bg-clip-text text-transparent">
          Ready to Code!
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
                Your Password
              </label>
              <BiShow
                className="ml-auto"
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
              className="mt-4 text-white px-6 py-3 bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-orange-500 hover:to-yellow-400 transition-colors rounded-lg font-medium shadow-lg shadow-orange-300"
            >
              {isLoading ? "Sending..." : "Send"}
            </button>
            <span className="ml-auto font-sans text-gray-400">
              Not registered yet?{" "}
              <Link href="/signup">
                {" "}
                <span className="text-orange-300">Sing Up</span>
              </Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};
