"use client";

import React, { useState } from "react";
import Image from "next/image";

interface Project {
  image: string;
  name: string;
  description: string;
  technologies: string[];
  members: string[];
  deployment: string;
  github: string;
}

interface SearchedPortfolioProps {
  projects: Project[];
}

import { Search } from "./Search";

export default function SearchedPortfolio({
  projects,
}: SearchedPortfolioProps) {
  const [filteredProjects, setFilteredProjects] = useState<Project[]>(projects);

  const handleSearch = (filtered: Project[]) => {
    setFilteredProjects(filtered);
  };

  return (
    <div>
      <Search projects={projects} onSearch={handleSearch} />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-gray-400 font-sans mt-6">
        {filteredProjects.map((project, index) => (
          <div
            key={index}
            className="bg-white shadow-2xl overflow-hidden transform transition hover:scale-105"
          >
            <div className="shadow-lg p-2">
              <div className="shadow-lg p-2">
                <div className="relative w-full h-48 bg-gray-200 rounded-t-lg overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.name}
                    className="object-cover"
                    layout="responsive"
                    width={300}
                    height={200}
                    quality={100}
                    loading="lazy"
                  />
                </div>
              </div>
            </div>

            <div className="p-4 text">
              <h2 className="text-orange-400 text-2xl font-semibold mb-2">
                {project.name}
              </h2>
              <p className="text-gray-400 mb-4">{project.description}</p>
              <div className="mb-4">
                <h3 className="text-orange-400 text-lg font-medium">
                  Technologies:
                </h3>
                <ul className="list-disc pl-6 text-gray-400">
                  {project.technologies.map((tech, i) => (
                    <li key={i}>{tech}</li>
                  ))}
                </ul>
              </div>
              <p className="text-orange-400 mb-2">
                <strong>Members:</strong> {project.members}
              </p>
              <div className="flex justify-between items-center">
                <a
                  href={project.deployment}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  Deployment
                </a>
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-800 hover:underline"
                >
                  GitHub
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
