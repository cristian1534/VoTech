import Link from "next/link";
import React from "react";

export const BackButton = () => {
  return (
    <div className="font-sans container flex justify-end w-full mb-6">
      <Link
        href="/"
        className="text-white px-8 py-3 bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-orange-500 hover:to-yellow-400 transition-all ease-in-out duration-300 rounded-lg font-semibold shadow-lg shadow-orange-300"
      >
        Back
      </Link>
    </div>
  );
};
