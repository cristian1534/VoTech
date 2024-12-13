import React from "react";
import { UseText } from "../customHooks/useText";
import { TMessage } from "../types/typeMessages";
import SearchedPortfolio from "./SearchedPortfolio";


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
    <div className="container mx-auto p-4">
      <div className="my-5">
        <UseText
          messageOne={messagesPortfolio.messageOne}
          messageTwo={messagesPortfolio.messageTwo}
          messageThree=""
          messageFour=""
        />
      </div>
      <div className="container mx-auto p-2">
        <SearchedPortfolio projects={projects} />
      </div>
    </div>
  );
};
