"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Search } from "./Search";
import { BiLinkExternal, BiGitBranch, BiCode, BiGroup } from "react-icons/bi";

interface Project {
  image: string;
  title: string;
  description: string;
  technologies: string[];
  members: string[];
  deployment: string;
  github: string;
}

interface SearchedPortfolioProps {
  projects: Project[];
}

export default function SearchedPortfolio({ projects }: SearchedPortfolioProps) {
  const [filteredProjects, setFilteredProjects] = useState<Project[]>(projects);

  const handleSearch = (filtered: Project[]) => {
    setFilteredProjects(filtered);
  };

  return (
    <div className="space-y-6">
      <Search projects={projects} onSearch={handleSearch} />
      
      {!filteredProjects.length && (
        <div className="bg-orange-500/10 border border-orange-500/20 rounded-xl p-4">
          <p className="text-center text-orange-400">
            No projects found matching your search criteria.
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project, index) => (
          <div
            key={index}
            className="bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-xl overflow-hidden hover:scale-[1.02] transition-transform duration-300"
          >
            <div className="relative aspect-video">
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                quality={90}
                priority={index < 3}
              />
            </div>

            <div className="p-6 space-y-4">
              <h2 className="text-xl font-semibold bg-gradient-to-r from-orange-400 to-yellow-500 bg-clip-text text-transparent">
                {project.title}
              </h2>
              
              <p className="text-gray-300">{project.description}</p>
              
              <div>
                <div className="flex items-center gap-2 mb-2 text-gray-300">
                  <BiCode className="text-orange-400" />
                  <h3 className="font-medium">Technologies</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {Array.isArray(project.technologies) ? (
                    project.technologies.map((tech, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 rounded-full text-sm bg-gray-700/50 text-gray-300"
                      >
                        {tech}
                      </span>
                    ))
                  ) : (
                    <span className="px-3 py-1 rounded-full text-sm bg-gray-700/50 text-gray-300">
                      {project.technologies}
                    </span>
                  )}
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-2 text-gray-300">
                  <BiGroup className="text-orange-400" />
                  <h3 className="font-medium">Team Members</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {Array.isArray(project.members) ? (
                    project.members.map((member, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 rounded-full text-sm bg-gray-700/50 text-gray-300"
                      >
                        {member}
                      </span>
                    ))
                  ) : (
                    <span className="px-3 py-1 rounded-full text-sm bg-gray-700/50 text-gray-300">
                      {project.members}
                    </span>
                  )}
                </div>
              </div>

              <div className="flex gap-4 pt-2">
                <a
                  href={project.deployment}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-orange-500/10 text-orange-400 hover:bg-orange-500/20 transition-colors"
                >
                  <BiLinkExternal />
                  Demo
                </a>
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-700/50 text-gray-300 hover:bg-gray-700/70 transition-colors"
                >
                  <BiGitBranch />
                  Code
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
