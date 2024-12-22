"use client";
import React, { useState } from "react";
import { JobCard } from "./JobCard";
import { BiSolidLeftArrow, BiSolidRightArrow } from "react-icons/bi";
import { BackButton } from "./BackButton";

const mockData = [
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
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 3;

  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = mockData.slice(indexOfFirstJob, indexOfLastJob);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const totalPages = Math.ceil(mockData.length / jobsPerPage);

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

        <div className="flex justify-center mt-8">
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 mx-2 text-white bg-orange-400 rounded-md disabled:bg-gray-400"
          >
            <BiSolidLeftArrow />
          </button>
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => paginate(index + 1)}
              className={`px-4 py-2 mx-2 rounded-md ${
                currentPage === index + 1
                  ? "bg-orange-300 text-white"
                  : "bg-gray-300"
              }`}
            >
              {index + 1}
            </button>
          ))}
          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 mx-2 text-white bg-orange-400 rounded-md disabled:bg-gray-400"
          >
            <BiSolidRightArrow />
          </button>
        </div>
        <div className="flex justify-center mt-8 mr-4">
          <BackButton />
        </div>
      </div>
    </div>
  );
};
