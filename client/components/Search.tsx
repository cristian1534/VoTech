"use client";
import React, { useState } from "react";
import { BiSearch, BiX } from "react-icons/bi";

interface Project {
  image: string;
  title: string;
  description: string;
  technologies: string[];
  members: string[];
  deployment: string;
  github: string;
}

interface SearchProps {
  projects: Project[];
  onSearch: (filteredProjects: Project[]) => void;
}

export const Search: React.FC<SearchProps> = ({ projects, onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.toLowerCase();
    setSearchTerm(value);

    const filteredProjects = projects.filter((project) => 
      project.title.toLowerCase().includes(value) ||
      project.technologies.some(tech => 
        typeof tech === 'string' && tech.toLowerCase().includes(value)
      ) ||
      project.description.toLowerCase().includes(value)
    );
    onSearch(filteredProjects);
  };

  const clearSearch = () => {
    setSearchTerm("");
    onSearch(projects);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <BiSearch className="text-gray-400 text-xl" />
        </div>
        <input
          type="text"
          placeholder="Search projects by title, technology, or description..."
          value={searchTerm}
          onChange={handleSearch}
          className="w-full pl-12 pr-12 py-3 bg-gray-700/50 border border-gray-600/50 rounded-xl text-gray-200 placeholder-gray-400 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
        />
        {searchTerm && (
          <button
            onClick={clearSearch}
            className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-200"
          >
            <BiX className="text-xl" />
          </button>
        )}
      </div>
    </div>
  );
};
