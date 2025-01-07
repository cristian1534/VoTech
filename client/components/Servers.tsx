import React from "react";
import { UseText } from "../customHooks/useText";
import { TMessage } from "../types/typeMessages";

export const Servers = () => {
  const messagesServers: TMessage = {
    messageOne: "Servers Health",
    messageTwo: "Manage servers information effectively.",
    messageThree: "",
    messageFour: "",
  };
  return (
    <div className="bg-gradient-to-br from-gray-50 to-white container mx-auto p-6 md:p-10 text-gray-700 font-sans">
      <UseText {...messagesServers} />
      <div className="flex flex-col md:flex-row justify-center items-center gap-6 mb-24">
        <a
          href="https://votech.onrender.com/admin/#/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 border border-gray-300 p-5 rounded-md bg-gradient-to-r from-gray-50 via-white to-gray-50 shadow-md hover:shadow-lg hover:scale-105 transition-all mt-2"
        >
          <span className="text-orange-400 font-medium">Chat Server</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-5 h-5 text-orange-600"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 9l3-3m0 0l3 3m-3-3v12"
            />
          </svg>
        </a>
        <a
          href="https://app.pm2.io/bucket/675d822eceba1c41b87b54c8/backend/overview/servers"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 border border-gray-300 p-5 rounded-md bg-gradient-to-r from-gray-50 via-white to-gray-50 shadow-md hover:shadow-lg hover:scale-105 transition-all mt-2"
        >
          <span className="text-orange-400 font-medium">App Server</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-5 h-5 text-orange-600"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 9l3-3m0 0l3 3m-3-3v12"
            />
          </svg>
        </a>
      </div>
    </div>
  );
};
