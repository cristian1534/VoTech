"use client";
import React from "react";
import { TUserProject } from "@/types/typeUserProject";
import { UseText } from "../customHooks/useText";
import { TMessage } from "../types/typeMessages";

interface DashUserProjectListProps {
  userProjects: TUserProject[];
}

export const DashUserProjectList = ({
  userProjects,
}: DashUserProjectListProps) => {
  const messagesAdmin: TMessage = {
    messageOne: "Teams and Projects",
    messageTwo:
      "Check information regarding what our Members have applied for.",
    messageThree: "",
    messageFour: "",
  };

  const groupedProjects = userProjects.reduce((acc, relation) => {
    if (!acc[relation.project_name]) {
      acc[relation.project_name] = [];
    }
    acc[relation.project_name].push(relation);
    return acc;
  }, {} as Record<string, TUserProject[]>);

  return (
    <div className="bg-white container flex flex-col justify-center p-4 mx-auto md:p-8 text-gray-400 font-sans">
      <div className="flex items-center justify-center text-center space-x-4 w-full max-w-md p-5 rounded-md"></div>
      <div>
        <UseText
          messageOne={messagesAdmin.messageOne}
          messageTwo={messagesAdmin.messageTwo}
          messageThree=""
          messageFour=""
        />
      </div>
      <div className="flex flex-col divide-y sm:px-8 lg:px-12 xl:px-32 divide-orange-300 mb-10">
        {Object.entries(groupedProjects).map(([projectName, relations]) => (
          <details key={projectName} className="py-4">
            <summary className="py-2 outline-none cursor-pointer focus:underline text-lg">
              <span className="text-orange-400 font-bold">PROJECT:</span>{" "}
              {projectName}
            </summary>
            <div className="px-4 pb-4">
              {relations.map((relation) => (
                <div
                  key={relation.user_email}
                  className="w-full flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 text-base bg-gray-50 p-4 rounded-md  my-3 shadow-2xl"
                >
                  <p className="sm:w-1/3">
                    <span className="text-orange-300 font-bold">
                      Team Member:
                    </span>{" "}
                    {relation.user_name}
                  </p>
                  <p className="sm:w-1/3">
                    <span className="text-orange-300 font-bold">Contact:</span>{" "}
                    {relation.user_email}
                  </p>
                  <p className="sm:w-1/3">
                    <span className="text-orange-300 font-bold">
                      Applying Date:
                    </span>{" "}
                    {relation.applied_at
                      ? new Date(relation.applied_at).toLocaleDateString(
                          "en-US"
                        )
                      : "N/A"}
                  </p>
                </div>
              ))}
            </div>
          </details>
        ))}
      </div>
    </div>
  );
};
