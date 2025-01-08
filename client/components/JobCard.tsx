"use client";

import React from "react";
import { Job } from "../types/typeJobs";
import { RiDeleteBin5Line } from "react-icons/ri";
import { deleteJobByUuid } from "../lib/api";
import { useSession } from "../context/SessionContext";

export const JobCard = ({ uuid, title, description, contact }: Job) => {
  const { sessionEmail } = useSession();

  return (
    <div className="max-w-md p-4 border border-gray-200 rounded-md shadow-lg bg-white hover:shadow-2xl transition-shadow flex flex-col">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold text-orange-400">{title}</h3>
        {sessionEmail === "admin@votech.com" && (
          <div className="text-red-500 cursor-pointer">
            <RiDeleteBin5Line size={20} onClick={() => deleteJobByUuid(uuid)} />
          </div>
        )}
      </div>

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
