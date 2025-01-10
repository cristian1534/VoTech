"use client";
import React from "react";
import { BackButton } from "../components/BackButton";

const Error = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white text-center p-6 font-sans">
      <div className="bg-orange-400 text-white p-8 rounded-lg shadow-lg mb-5">
        <h1 className="text-2xl font-semibold mb-4">Something Went Wrong...</h1>
        <p className="text-lg">
          We encountered an unexpected issue. Please try again later.
        </p>
      </div>
      <BackButton />
    </div>
  );
};
export default Error;
