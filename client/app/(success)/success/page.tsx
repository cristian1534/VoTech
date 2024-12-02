"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

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
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-orange-100 via-orange-50 to-yellow-100 font-sans">
      <div className="text-center bg-white p-8 rounded-2xl shadow-lg transform transition-all duration-300 hover:scale-105 w-80 sm:w-96">
        <h1 className="text-center text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-yellow-500">
          Payment Successful!
        </h1>
        <p className="mt-4 text-lg text-gray-600">
          Preparing your Sign Up, please wait...
        </p>
        <div className="relative mt-6">
          <div className="w-full h-2 bg-gray-200 rounded-full">
            <div className="h-2 bg-gradient-to-r from-orange-400 to-yellow-500 rounded-full animate-progress"></div>
          </div>
        </div>
        <p className="mt-4 text-sm text-gray-400">
          Redirecting you in 10 seconds...
        </p>
      </div>
    </div>
  );
};

export default Success;
