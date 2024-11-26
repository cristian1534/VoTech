import React from "react";
import Image from "next/image";
import { UseText } from "../customHooks/useText";
import { TMessage } from "../types/typeMessages";
import { BiLogoGithub } from "react-icons/bi";
import { BiLink } from "react-icons/bi";

interface PortfolioProps {
  projects: {
    image: string;
    name: string;
    description: string;
    technologies: string[];
    members: string[];
    deployment: string;
    github: string;
  }[];
}

const messagesPortfolio: TMessage = {
  messageOne: "Completed Projects by VoTech Junior Teams",
  messageTwo: "Explore the completed projects by the junior teams at VoTech. This section is shared with recruiters and the community, providing access to the code on GitHub, the deployed version, and the participants involved.",
  messageThree: "",
  messageFour: "",
};
export const PortfolioList = ({ projects }: PortfolioProps) => {
  return (
    <div className="container mx-auto p-4">
      <div className="my-5">
        <UseText
          messageOne={messagesPortfolio.messageOne}
          messageTwo={messagesPortfolio.messageTwo}
          messageThree=""
          messageFour=""
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-gray-400 font-sans">
        {projects.map((project, index) => (
          <div
            key={index}
            className="bg-white shadow-2xl overflow-hidden transform transition hover:scale-105"
          >
            <div className="shadow-lg p-2">
              <div className="relative w-full h-48">
                <Image
                  src={project.image}
                  alt={project.name}
                  layout="fill"
                  objectFit="cover"
                  objectPosition="center"
                  loading="lazy"
                  className="rounded-t-lg"
                />
              </div>
            </div>

            <div className="p-4 text">
              <h2 className="text-orange-400 text-2xl font-semibold mb-2">{project.name}</h2>
              <p className="text-gray-400 mb-4">{project.description}</p>
              <div className="mb-4">
                <h3 className="text-orange-400 text-lg font-medium">Technologies:</h3>
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
                  <BiLink size={40}/>
                </a>
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-800 hover:underline"
                > 
                <BiLogoGithub size={40}/>
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
