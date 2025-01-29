"use client";
import React, { useEffect, useState } from "react";
import { deleteMessageByUuid, getAllMessages } from "../lib/api";
import { UseText } from "../customHooks/useText";
import { TMessage } from "../types/typeMessages";
import { ButtonDelete } from "./ButtonDelete";
import { TContact } from "../types/typeContact";

export const DashContactList = () => {
  const [messages, setMessages] = useState<TContact[]>([]);
  const messagesAdmin: TMessage = {
    messageOne: "Messages from Memberships",
    messageTwo: "Keeping in touch with our community.",
    messageThree: "",
    messageFour: "",
  };

  useEffect(() => {
    const fetchMessages = async () => {
      const messages = await getAllMessages();
      setMessages(messages || []);
    };
    fetchMessages();
  }, []);

  return (
    <div className="bg-gradient-to-br from-gray-50 to-white container mx-auto p-6 md:p-10 text-gray-700 font-sans">
      <UseText {...messagesAdmin} />

      <div className="space-y-6 mt-6 mb-10">
        {messages.length === 0 && (
          <div className="text-center text-orange-400 text-lg font-semibold">
            No messages yet.
          </div>
        )}
        {messages?.map((message) => (
          <details
            key={message.uuid}
            className="group border border-gray-200 p-4 rounded-lg bg-white shadow-md hover:shadow-xl transition-all"
          >
            <summary className="text-xl font-semibold cursor-pointer text-gray-400 group-open:text-orange-500 group-open:font-bold">
              {message.name}
            </summary>
            <div className="w-full flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 text-sm sm:text-base bg-gray-50 p-4 rounded-md shadow-lg group-open:shadow-xl">
              <div className="w-full flex items-center gap-3 text-gray-400">
                <span className="font-medium text-orange-400">Email:</span>
                <span className="text-gray-400">{message.email}</span>
                <span className="font-medium text-orange-400">Message:</span>
                <span className="text-gray-400">{message.message}</span>
              </div>
              <ButtonDelete
                onDelete={deleteMessageByUuid}
                uuid={message.uuid || ""}
                className="mt-3 sm:mt-0"
              />
            </div>
          </details>
        ))}
      </div>
    </div>
  );
};
