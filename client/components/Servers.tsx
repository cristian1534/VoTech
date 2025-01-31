import React from "react";
import { UseText } from "../customHooks/useText";
import { TMessage } from "../types/typeMessages";
import { BiServer, BiChat, BiMobile, BiHealth } from "react-icons/bi";

export const Servers = () => {
  const messagesServers: TMessage = {
    messageOne: "Servers Health",
    messageTwo: "Manage servers information effectively.",
    messageThree: "",
    messageFour: "",
  };

  const servers = [
    {
      name: "Chat Server",
      icon: <BiChat className="text-2xl" />,
      url: "https://votech.onrender.com/admin/#/",
      gradient: "from-blue-400/10 to-cyan-400/10",
      border: "border-blue-500/20",
      iconBg: "bg-blue-500/10",
      textColor: "text-blue-400"
    },
    {
      name: "App Server",
      icon: <BiMobile className="text-2xl" />,
      url: "https://app.pm2.io/bucket/675d822eceba1c41b87b54c8/backend/overview/servers",
      gradient: "from-emerald-400/10 to-teal-400/10",
      border: "border-emerald-500/20",
      iconBg: "bg-emerald-500/10",
      textColor: "text-emerald-400"
    },
    {
      name: "Health Server",
      icon: <BiHealth className="text-2xl" />,
      url: "https://dashboard.uptimerobot.com/monitors/798331953",
      gradient: "from-orange-400/10 to-yellow-400/10",
      border: "border-orange-500/20",
      iconBg: "bg-orange-500/10",
      textColor: "text-orange-400"
    }
  ];

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 shadow-xl p-6">
          <UseText {...messagesServers} />
      <div className="flex items-center gap-3 mb-8">
        
        <div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {servers.map((server) => (
          <a
            key={server.name}
            href={server.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`group bg-gradient-to-br ${server.gradient} backdrop-blur-sm border ${server.border} p-6 rounded-2xl transition-all duration-300 hover:scale-105`}
          >
            <div className="flex items-center gap-4 mb-4">
              <div className={`p-3 rounded-xl ${server.iconBg} group-hover:scale-110 transition-transform`}>
                {server.icon}
              </div>
              <div>
                <h3 className={`font-medium ${server.textColor}`}>{server.name}</h3>
                <p className="text-sm text-gray-400">View Dashboard</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <div className={`w-2 h-2 rounded-full ${server.textColor} animate-pulse`} />
              Active and running
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};
