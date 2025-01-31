"use client";
import React, { useEffect, useState } from "react";
import { JobCard } from "./JobCard";
import { BackButton } from "./BackButton";
import { usePagination } from "../customHooks/usePagination";
import { BiSolidLeftArrow, BiSolidRightArrow, BiPackage } from "react-icons/bi";
import { getJobs } from "../lib/api";
import { Job } from '../types/typeJobs';
import { motion } from "framer-motion";

export const JobsList = () => {
  const [mockData, setMockData] = useState<Job[]>([]);
  const pageLimit = 3;
  const { currentPage, offset, totalPages, getPageNeighbours, changePage } =
    usePagination({
      totalRecords: mockData.length,
      pageLimit,
    });

  const [currentJobs, setCurrentJobs] = useState<Job[]>([]);

  useEffect(() => {
    const fetchJobs = async () => {
      const jobs = await getJobs();
      if (jobs) {
        setMockData(jobs);
        setCurrentJobs(jobs.slice(offset, offset + pageLimit));
      }
    };
    fetchJobs();
  }, [offset, pageLimit]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {!currentJobs.length ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-orange-500/10 border border-orange-500/20 rounded-xl p-8 text-center"
          >
            <BiPackage className="mx-auto text-4xl text-orange-400 mb-3" />
            <p className="text-gray-300">No job listings available at the moment.</p>
          </motion.div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentJobs.map((job) => (
                <JobCard
                  key={job.uuid}
                  uuid={job.uuid}
                  title={job.title}
                  description={job.description}
                  contact={job.contact}
                />
              ))}
            </div>

            <div className="flex justify-center mt-8">
              <div className="flex items-center gap-2 bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50 p-2">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  disabled={currentPage === 1}
                  onClick={() => changePage(currentPage - 1)}
                  className="p-2 rounded-lg text-gray-400 hover:text-orange-400 disabled:opacity-50 disabled:hover:text-gray-400"
                >
                  <BiSolidLeftArrow />
                </motion.button>

                {getPageNeighbours(currentPage).map((page) => (
                  <motion.button
                    key={page}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => changePage(page)}
                    className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
                      currentPage === page
                        ? "bg-orange-500/20 text-orange-400"
                        : "text-gray-400 hover:text-orange-400"
                    }`}
                  >
                    {page}
                  </motion.button>
                ))}

                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  disabled={currentPage === totalPages}
                  onClick={() => changePage(currentPage + 1)}
                  className="p-2 rounded-lg text-gray-400 hover:text-orange-400 disabled:opacity-50 disabled:hover:text-gray-400"
                >
                  <BiSolidRightArrow />
                </motion.button>
              </div>
            </div>
          </>
        )}

        <div className="flex justify-center mt-8">
          <BackButton />
        </div>
      </div>
    </div>
  );
};
