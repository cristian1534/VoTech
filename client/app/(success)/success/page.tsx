"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { BiCheckCircle } from "react-icons/bi";

const Success = () => {
  const router = useRouter();

  useEffect(() => {
    Cookies.set("paymentCompleted", "true", { expires: 1 });

    const timer = setTimeout(() => {
      router.push("/signup");
    }, 10000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="text-center bg-gray-800/50 backdrop-blur-lg p-8 rounded-3xl border border-orange-500/20 shadow-xl w-[90%] max-w-md mx-4">
        <div className="flex justify-center mb-6">
          <BiCheckCircle className="text-6xl text-orange-500 animate-bounce" />
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-orange-400 to-yellow-500 bg-clip-text text-transparent mb-6">
          Payment Successful!
        </h1>
        <p className="text-lg text-gray-300 mb-8">
          Preparing your Sign Up, please wait...
        </p>
        <div className="relative mb-6">
          <div className="w-full h-2 bg-gray-700/50 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full animate-progress" />
          </div>
        </div>
        <p className="text-sm text-gray-400">
          Redirecting you in 10 seconds...
        </p>
      </div>
    </div>
  );
};

export default Success;
