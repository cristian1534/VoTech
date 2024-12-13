"use client";
import React, { useState } from "react";

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
      project.title.toLowerCase().includes(value)
    );
    onSearch(filteredProjects);
  };

  return (
    <div className="w-full max-w-md mx-auto my-4">
      <input
        type="text"
        placeholder="Search for projects here..."
        value={searchTerm}
        onChange={handleSearch}
        className="w-full px-4 py-2 border-b-2 border-gray-300 focus:ring-0 focus:outline-none focus:border-yellow-400 text-gray-400"
      />
    </div>
  );
};
