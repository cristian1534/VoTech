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
    <div className="flex justify-center items-center min-h-screen bg-gray-50 font-sans">
      <div className="text-center bg-white p-8 rounded-lg shadow-2xl w-80 sm:w-96">
        <h1 className="text-center my-6 text-4xl md:text-5xl lg:text-6xl font-extrabold bg-gradient-to-r from-orange-400 to-yellow-500 bg-clip-text text-transparent">
          Payment Successful!
        </h1>
        <p className="text-center my-6 text-4xl md:text-5xl lg:text-6xl font-extrabold bg-gradient-to-r from-orange-400 to-yellow-500 bg-clip-text text-transparent">
          Preparing your Sign Up...
        </p>
        <div className="mt-6">
          <div className="w-full h-2 bg-orange-400 rounded-full animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

export default Success;
