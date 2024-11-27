'use client'
import React from "react";
import { deleteUserByUuid } from "../lib/api";
import { UseText } from "../customHooks/useText";
import { TMessage } from "../types/typeMessages";
import { BiCodeAlt } from "react-icons/bi";
import { ButtonDelete } from "./ButtonDelete";
import { TUser } from "../types/typeUser";

interface DashUsersListProps {
  users: TUser[];
}

export const DashUsersList = ({ users }: DashUsersListProps) => {
  const messagesAdmin: TMessage = {
    messageOne: "Private Backoffice",
    messageTwo: "Handle private information from users.",
    messageThree: "",
    messageFour: "",
  };

  return (
    <div className="bg-white container flex flex-col justify-center p-4 mx-auto md:p-8 text-gray-400 font-sans">
      <div className="flex items-center justify-center text-center space-x-4 w-full max-w-md p-5 rounded-md">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold bg-gradient-to-r from-orange-400 to-yellow-500 bg-clip-text text-transparent">
          Team
        </h1>
        <span className="text-orange-300">
          <BiCodeAlt size={50} />
        </span>
        <span className="text-transparent bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-4xl md:text-5xl lg:text-6xl font-extrabold">
          VoTech
        </span>
      </div>
      <div>
        <UseText
          messageOne={messagesAdmin.messageOne}
          messageTwo={messagesAdmin.messageTwo}
          messageThree=""
          messageFour=""
        />
      </div>
      <div className="flex flex-col divide-y sm:px-8 lg:px-12 xl:px-32 divide-orange-300 my-3">
        {users?.map((user) => (
          <details key={user.uuid}>
            <summary className="py-2 outline-none cursor-pointer focus:underline">
              {user.name}
            </summary>
            <div className="px-4 pb-4">
              <div className="w-full flex items-center">
                <p>{user.email}</p>
                <ButtonDelete
                  onDelete={deleteUserByUuid}
                  uuid={user.uuid || ""}
                />
              </div>
            </div>
          </details>
        ))}
      </div>
    </div>
  );
};