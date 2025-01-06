"use client";

import React from "react";
import { Job } from "../types/typeJobs";


export const JobCard = ({ title, description, contact }: Job) => {
  return (
    <div className="max-w-md p-4 border border-gray-200 rounded-md shadow-lg bg-white hover:shadow-2xl transition-shadow flex flex-col">
      <h3 className="text-xl font-bold text-orange-400">{title}</h3>
      <p className="mt-2 text-gray-400 flex-grow">{description}</p>
      <div className="mt-4 self-end">
        <a
          href={`mailto:${contact}`}
          className="items-center text-orange-400 hover:text-yellow-500 hover:bg-orange-100 rounded-sm transition-all duration-300 p-2"
        >
          {contact}
        </a>
      </div>
    </div>
  );
};
