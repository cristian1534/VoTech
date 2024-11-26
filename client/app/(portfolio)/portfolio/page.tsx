import React from "react";
import { PortfolioList } from "../../../components/PortfolioList";
import Link from "next/link";

const projects = [
  {
    image:
      "https://imgs.search.brave.com/Nnk5FvlssUsKYUaHhO_pyRL7sSMRsNROsQRkY2AiN6k/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/bXlwZXJzb25hbHRy/YWluZXJ3ZWJzaXRl/LmNvbS91cGxvYWRz/LzIvMi8wLzEvMjIw/MTQ2OTQvc2NyZWVu/LXNob3QtMjAxOC0w/NS0wNS1hdC0xMS0y/OS00Nl9vcmlnLnBu/Zw",
    name: "Personal Training",
    description: "Virtual classes for fitness.",
    technologies: ["React", "Node.js", "Tailwind CSS"],
    members: ["Pedro, Juan, Gonzalo"],
    deployment: "https://project1-deployment.com",
    github: "https://github.com/user/project1",
  },
  {
    image:
      "https://imgs.search.brave.com/8iumeecBnOcXumHDhPJkv54jBdFIItUwQdcNEiRWr30/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9hc3Nl/dHMuanVzdGlubWlu/ZC5jb20vd3AtY29u/dGVudC91cGxvYWRz/LzIwMjQvMDcvaGVy/by1pbWFnZS1leGFt/cGxlcy1tYXJzLWV4/cGxvcmVyLnBuZw",
    name: "World Ticket",
    description: "Touristic Agency for Holidays.",
    technologies: ["Python", "Flask", "Bootstrap"],
    members: ["Carlos, Arturo, Mauro"],
    deployment: "https://project2-deployment.com",
    github: "https://github.com/user/project2",
  },
];

export default function page() {
  return (
    <div>
      <PortfolioList projects={projects || []} />
      <div className="container flex justify-end w-full p-2 font-sans">
        <Link
          href="/"
          className="text-white px-6 py-2 mb-2 bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-orange-500 hover:to-yellow-400 transition-colors rounded-lg font-medium shadow-lg shadow-orange-300"
        >
          Back
        </Link>
      </div>
    </div>
  );
}
