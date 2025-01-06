'use client'
import React from "react";

export const ScrollButton = () => {
  return (
    <div>
      <button
        className="fixed bottom-24 right-6 bg-orange-300 text-white p-4 rounded-full shadow-lg hover:bg-orange-200 focus:outline-none"
        onClick={() => {
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          });
        }}
      >
        ⬆
      </button>
    </div>
  );
};
