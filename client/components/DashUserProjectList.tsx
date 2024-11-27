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
      <div className="flex flex-col divide-y sm:px-8 lg:px-12 xl:px-32 divide-orange-300 my-3">
        {userProjects?.map((relation) => (
          <details key={relation.project_id}>
            <summary className="py-2 outline-none cursor-pointer focus:underline">
              <span className="text-orange-400">PROJECT: </span> {relation.project_name}
            </summary>
            <div className="px-4 pb-4">
              <div className="w-full flex items-center gap-6">
                <p><span className="text-orange-300">Team Member: </span>{relation.user_name}</p>
                <p><span className="text-orange-300">Contact: </span>{relation.user_email}</p>
              </div>
            </div>
          </details>
        ))}
      </div>
    </div>
  );
};
