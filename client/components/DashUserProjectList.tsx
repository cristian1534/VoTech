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
    messageTwo: "Check information regarding what our Members have applied for.",
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
    <div className="bg-gradient-to-br from-gray-50 to-white container mx-auto p-6 md:p-10 text-gray-400 font-sans">
      <UseText
        messageOne={messagesAdmin.messageOne}
        messageTwo={messagesAdmin.messageTwo}
        messageThree=""
        messageFour=""
      />

      <div className="space-y-6 mt-6 mb-10">
        {Object.entries(groupedProjects).map(([projectName, relations]) => (
          <details
            key={projectName}
            className="group border border-gray-200 p-4 rounded-lg bg-white shadow-md hover:shadow-xl transition-all"
          >
            <summary className="text-xl font-semibold cursor-pointer text-gray-400 group-open:text-orange-500 group-open:font-bold">
              {projectName}
            </summary>
            <div className="w-full flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 text-sm sm:text-base bg-gray-50 p-4 rounded-md shadow-lg group-open:shadow-xl">
              {relations.map((relation) => (
                <div
                  key={relation.user_email}
                  className="w-full flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 text-base bg-gray-50 p-4 rounded-md my-3 shadow-2xl"
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
