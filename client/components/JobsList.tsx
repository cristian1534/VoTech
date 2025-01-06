"use client";
import React, { useEffect, useState } from "react";
import { JobCard } from "./JobCard";
import { BackButton } from "./BackButton";
import { usePagination } from "../customHooks/usePagination";
import { BiSolidLeftArrow, BiSolidRightArrow } from "react-icons/bi";
import { getJobs } from "../lib/api";

interface Job {
  title: string;
  description: string;
  contact: string;
}


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
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-full max-w-4xl">
        {!currentJobs.length ? (
          <div className="flex justify-center bg-orange-400 rounded-md mx-auto w-full">
            <p className="text-center text-white p-2 w-full">
              NO PROJECTS TO SHOW...
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {currentJobs.map((job, index) => (
                <JobCard
                  key={index}
                  title={job.title}
                  description={job.description}
                  contact={job.contact}
                />
              ))}
            </div>

            <div className="flex justify-center mt-8 text-gray-400 font-sans">
              <div className="flex">
                <button
                  disabled={currentPage === 1}
                  onClick={() => changePage(currentPage - 1)}
                  className="p-2"
                >
                  <BiSolidLeftArrow />
                </button>
                {getPageNeighbours(currentPage).map((page) => (
                  <button
                    key={page}
                    onClick={() => changePage(page)}
                    className={`rounded-sm p-2 ${
                      currentPage === page ? "bg-orange-300 text-white" : ""
                    }`}
                  >
                    {page}
                  </button>
                ))}
                <button
                  disabled={currentPage === totalPages}
                  onClick={() => changePage(currentPage + 1)}
                  className="p-2"
                >
                  <BiSolidRightArrow />
                </button>
              </div>
            </div>
          </>
        )}

        <div className="flex justify-center mt-8 mr-4">
          <BackButton />
        </div>
      </div>
    </div>
  );
};
