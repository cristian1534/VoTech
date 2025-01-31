"use client";

import React from "react";
import { Job } from "../types/typeJobs";
import { RiDeleteBin5Line } from "react-icons/ri";
import { BiBuildings, BiEnvelope, BiDetail } from "react-icons/bi";
import { deleteJobByUuid } from "../lib/api";
import { useSession } from "../context/SessionContext";
import { motion } from "framer-motion";

export const JobCard = ({ uuid, title, description, contact }: Job) => {
  const { sessionEmail } = useSession();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 hover:border-orange-500/50 transition-all duration-300"
    >
      <div className="flex justify-between items-start gap-4">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-lg bg-orange-500/10 text-orange-400">
            <BiBuildings className="text-xl" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-200">{title}</h3>
            <div className="flex items-center gap-2 mt-1 text-sm text-gray-400">
              <BiDetail />
              <span>Job Details</span>
            </div>
          </div>
        </div>

        {sessionEmail === "admin@votech.com" && (
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => deleteJobByUuid(uuid)}
            className="p-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors"
          >
            <RiDeleteBin5Line size={20} />
          </motion.button>
        )}
      </div>

      <p className="mt-4 text-gray-300 leading-relaxed">
        {description}
      </p>

      <div className="mt-6">
        <a
          href={`mailto:${contact}`}
          className="inline-flex items-center gap-2 text-orange-400 hover:text-orange-300 transition-colors"
        >
          <BiEnvelope className="text-xl" />
          <span>{contact}</span>
        </a>
      </div>
    </motion.div>
  );
};
