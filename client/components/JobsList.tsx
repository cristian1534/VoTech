"use client";
import React, { useEffect, useState } from "react";
import { JobCard } from "./JobCard";
import { BackButton } from "./BackButton";
import { usePagination } from "../customHooks/usePagination";
import { BiSolidLeftArrow, BiSolidRightArrow } from "react-icons/bi";

interface Job {
  title: string;
  description: string;
  contact: string;
}

const mockData: Job[] = [
  {
    title: "Junior React Developer",
    description:
      "Collaborate in creating dynamic and responsive web applications using React. Ideal for developers with a passion for UI/UX design.",
    contact: "react.jobs@example.com",
  },
  {
    title: "Backend Developer - Node.js",
    description:
      "Join our team to build and optimize scalable APIs. Basic knowledge of Express.js and MongoDB is a plus.",
    contact: "backend.careers@example.com",
  },
  {
    title: "Full Stack Developer Intern",
    description:
      "Work on both front-end and back-end development with guidance from senior developers. Perfect for those looking to learn modern web technologies.",
    contact: "internships@example.com",
  },
  {
    title: "Junior Python Developer",
    description:
      "Assist in developing data-driven applications and automation scripts. A great opportunity to learn and grow in the Python ecosystem.",
    contact: "python.jobs@example.com",
  },
  {
    title: "Mobile App Developer - React Native",
    description:
      "Help build and optimize mobile applications for iOS and Android platforms. Basic understanding of React Native is required.",
    contact: "mobile.jobs@example.com",
  },
];

export const JobsList = () => {
  const pageLimit = 3;
  const { currentPage, offset, totalPages, getPageNeighbours, changePage } =
    usePagination({
      totalRecords: mockData.length,
      pageLimit,
    });

  const [currentJobs, setCurrentJobs] = useState<Job[]>([]);

  useEffect(() => {
    setCurrentJobs(mockData.slice(offset, offset + pageLimit));
  }, [offset, pageLimit]);

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-full max-w-4xl">
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

        <div className="flex justify-center mt-8 mr-4">
          <BackButton />
        </div>
      </div>
    </div>
  );
};
