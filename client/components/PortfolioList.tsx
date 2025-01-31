import React from "react";
import { UseText } from "../customHooks/useText";
import { TMessage } from "../types/typeMessages";
import SearchedPortfolio from "./SearchedPortfolio";
import { BiCodeAlt } from "react-icons/bi";

interface PortfolioProps {
  projects: {
    image: string;
    title: string;
    description: string;
    technologies: string[];
    members: string[];
    deployment: string;
    github: string;
  }[];
}

const messagesPortfolio: TMessage = {
  messageOne: "Completed Projects by VoTech Junior Teams",
  messageTwo:
    "Explore the completed projects by the junior teams at VoTech. This section is shared with recruiters and the community, providing access to the code on GitHub, the deployed version, and the participants involved.",
  messageThree: "",
  messageFour: "",
};

export const PortfolioList = ({ projects }: PortfolioProps) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-12">
          <UseText {...messagesPortfolio} />
        
      </div>

      <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl border border-gray-700/50 p-6">
        <SearchedPortfolio projects={projects} />
      </div>
    </div>
  );
};
