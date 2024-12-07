"use client";
import React, { useState } from "react";
import { deleteUserByUuid, handlePaymentState } from "../lib/api";
import { UseText } from "../customHooks/useText";
import { TMessage } from "../types/typeMessages";
import { BiCodeAlt } from "react-icons/bi";
import { ButtonDelete } from "./ButtonDelete";
import { ButtonStateAccount } from "./ButtonStateAccount";
import { TUser } from "../types/typeUser";

interface DashUsersListProps {
  users: TUser[];
}

export const DashUsersList = ({ users }: DashUsersListProps) => {
  const [payment, setPayment] = useState(true);
  const messagesAdmin: TMessage = {
    messageOne: "Membership Information",
    messageTwo: "Manage user information effectively.",
    messageThree: "",
    messageFour: "",
  };

  return (
    <div className="bg-gradient-to-br from-gray-50 to-white container mx-auto p-6 md:p-10 text-gray-700 font-sans">
      <div className="flex flex-col items-center justify-center text-center space-x-4 w-full  p-6  mb-8">
        <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-500">
          Admin
        </h1>
        <span className="text-orange-500">
          <BiCodeAlt size={48} />
        </span>
        <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-500">
          Dashboard
        </h1>
      </div>

      <UseText
        messageOne={messagesAdmin.messageOne}
        messageTwo={messagesAdmin.messageTwo}
        messageThree=""
        messageFour=""
      />

      <div className="space-y-6 mt-6">
        {users?.map((user) => (
          <details
            key={user.uuid}
            className="group border border-gray-200 p-4 rounded-lg bg-white shadow-md hover:shadow-xl transition-all"
          >
            <summary className="text-xl font-semibold cursor-pointer text-gray-400 group-open:text-orange-500 group-open:font-bold">
              {user.name}
            </summary>
            <div className="w-full flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 text-sm sm:text-base bg-gray-50 p-4 rounded-md shadow-lg group-open:shadow-xl">
              <div className="w-full flex items-center gap-3 text-gray-400">
                <span className="font-medium text-orange-400">Email:</span>
                <span className="text-gray-400">{user.email}</span>
              </div>
              <ButtonStateAccount
                handlePaymentState={() =>
                  handlePaymentState(user.uuid, payment, setPayment)
                }
                payment={payment}
                uuid={user.uuid || ""}
                className="mt-3 sm:mt-0"
              />

              <ButtonDelete
                onDelete={deleteUserByUuid}
                uuid={user.uuid || ""}
                className="mt-3 sm:mt-0"
              />
            </div>
          </details>
        ))}
      </div>
    </div>
  );
};
