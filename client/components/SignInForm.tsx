"use client";
import React, { useEffect, useState } from "react";
import { BiShow } from "react-icons/bi";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import { TAuth, TToken } from "../types/typeUser";
import { setSession } from "../customHooks/setSession"
import { useSession } from "../context/SessionContext";
import { motion } from "framer-motion";
import { fadeIn } from "../helpers/variants";
import Cookies from "js-cookie";
import dynamic from "next/dynamic";

const GoogleAuthButton = dynamic(
  () => import("./GoogleAuthButton").then((mod) => mod.default),
  {
    ssr: false,
    loading: () => (
      <div className="w-full py-4 bg-gray-700/50 rounded-lg text-center text-gray-400">
        Loading...
      </div>
    ),
  }
);

export const SignInForm: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>();
  const [message, setMessage] = useState("");
  const [, setUser] = useState({});
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { setSessionToken, setSessionUser, setSessionEmail } = useSession();
  const clientId = process.env.NEXT_PUBLIC_CLIENT_ID;

  const { register, handleSubmit, formState: { errors }, reset } = useForm<TAuth>();

  const [isGapiReady, setIsGapiReady] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const loadGapi = async () => {
        const { gapi } = await import("gapi-script");
        gapi.load("client:auth2", () => {
          gapi.client.init({
            clientId: clientId,
            scope: "profile email",
          }).then(() => {
            setIsGapiReady(true);
          });
        });
      };
      loadGapi();
    }
  }, [clientId]);

  const onSubmit = async (data: TAuth): Promise<void> => {
    try {
      setIsLoading(true);
      setUser(data);
      const response = await axios.post<TToken>(
        `${process.env.NEXT_PUBLIC_URL_DEV}/users/auth`,
        data
      );
      const token = response.data?.data?.token;

      if (token) {
        Cookies.set("token", token, { secure: true, sameSite: "strict" });
        setSession(token);
        setSessionUser(response.data?.data.name);
        setSessionEmail(response.data?.data.email);
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

  if (!isGapiReady) {
    return <div>Loading Google API...</div>; 
  }

  return (
    <motion.div
      className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 min-h-screen py-16 font-sans"
      variants={fadeIn({ direction: "up", delay: 0.2 })}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.3 }}
    >
      <div className="container max-w-lg mx-auto px-4 relative z-10">
        <motion.div
          className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-xl border border-gray-700/50"
          variants={fadeIn({ direction: "up", delay: 0.3 })}
        >
          <motion.h2
            className="text-4xl md:text-5xl font-bold text-center mb-8 bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent"
            variants={fadeIn({ direction: "down", delay: 0.4 })}
          >
            Ready to Code!
          </motion.h2>

          {message && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`${
                error ? "bg-red-500/10 border-red-500/50" : "bg-green-500/10 border-green-500/50"
              } border text-${error ? "red" : "green"}-400 p-4 rounded-lg mb-6 text-center`}
            >
              {message}
            </motion.div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2">
              <label className="text-gray-300 text-sm">Your Email</label>
              <input
                type="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                    message: "Invalid email address",
                  },
                })}
                className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-lg focus:outline-none focus:border-orange-500 text-gray-200"
                placeholder="Enter your email"
              />
              {errors.email && (
                <span className="text-orange-400 text-sm">{errors.email.message}</span>
              )}
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-gray-300 text-sm">Password</label>
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleShowPassword}
                  className="text-gray-400 hover:text-orange-400"
                >
                  <BiShow size={20} />
                </motion.button>
              </div>
              <input
                type={showPassword ? "text" : "password"}
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
                className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-lg focus:outline-none focus:border-orange-500 text-gray-200"
                placeholder="Enter your password"
              />
              {errors.password && (
                <span className="text-orange-400 text-sm">{errors.password.message}</span>
              )}
            </div>

            <motion.button
              type="submit"
              disabled={isLoading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-4 bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-orange-500 hover:to-yellow-400 text-white rounded-lg font-medium shadow-lg shadow-orange-500/20 transition-all duration-300 disabled:opacity-50"
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </motion.button>
            <GoogleAuthButton />
          </form>
        </motion.div>
      </div>
    </motion.div>
  );
};
