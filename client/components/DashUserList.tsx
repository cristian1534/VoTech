"use client";
import React, { useEffect, useState } from "react";
import { deleteUserByUuid, handlePaymentState, getUsers } from "../lib/api";
import { UseText } from "../customHooks/useText";
import { TMessage } from "../types/typeMessages";
import { BiCodeAlt } from "react-icons/bi";
import { ButtonDelete } from "./ButtonDelete";
import { ButtonStateAccount } from "./ButtonStateAccount";
import { TUser } from "../types/typeUser";

export const DashUsersList = () => {
  const [payment, setPayment] = useState(true);
  const [users, setUsers] = useState<TUser[]>([]);
  const messagesAdmin: TMessage = {
    messageOne: "Membership Information",
    messageTwo: "Manage user information effectively.",
    messageThree: "",
    messageFour: "",
  };

  useEffect(() => {
    const fetchUsers = async () => {
      const data = await getUsers();
      setUsers(data || []);
    };
    fetchUsers();
  }, []);

  return (
    <div className="font-sans bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 shadow-xl p-6">
      <div className="flex flex-col items-center justify-center space-y-4 mb-8">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-orange-400 to-yellow-500 bg-clip-text text-transparent">
          User Management
        </h2>
        <div className="p-3 rounded-xl bg-orange-500/10 text-orange-400">
          <BiCodeAlt size={32} />
        </div>
      </div>

      <UseText {...messagesAdmin} />

      <div className="space-y-4 mt-6">
        {users?.map((user) => (
          <details
            key={user.uuid}
            className="group border border-gray-700/50 rounded-xl bg-gray-800/30 overflow-hidden transition-all duration-200 hover:bg-gray-800/50"
          >
            <summary className="flex items-center justify-between p-4 cursor-pointer">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-orange-400 to-yellow-500 flex items-center justify-center text-white font-medium">
                  {user.name[0].toUpperCase()}
                </div>
                <span className="text-lg font-medium text-gray-300 group-open:text-orange-400 transition-colors">
                  {user.name}
                </span>
              </div>
              <div className="w-6 h-6 rounded-full border-2 border-gray-600 group-open:border-orange-400 group-open:bg-orange-400/10 transition-all duration-200" />
            </summary>
            
            <div className="p-4 border-t border-gray-700/50 bg-gray-800/50">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-orange-400">Email:</span>
                    <span className="text-gray-300">{user.email}</span>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-3">
                  <ButtonStateAccount
                    handlePaymentState={() =>
                      handlePaymentState(user.uuid, payment, setPayment)
                    }
                    payment={payment}
                    uuid={user.uuid || ""}
                  />
                  <ButtonDelete
                    onDelete={deleteUserByUuid}
                    uuid={user.uuid || ""}
                  />
                </div>
              </div>
            </div>
          </details>
        ))}
      </div>
    </div>
  );
};
