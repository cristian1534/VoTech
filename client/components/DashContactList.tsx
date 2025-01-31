"use client";
import React, { useEffect, useState } from "react";
import { deleteMessageByUuid, getAllMessages } from "../lib/api";
import { UseText } from "../customHooks/useText";
import { TMessage } from "../types/typeMessages";
import { ButtonDelete } from "./ButtonDelete";
import { TContact } from "../types/typeContact";
import { motion, AnimatePresence } from "framer-motion";
import { BiEnvelope, BiMessageDetail } from "react-icons/bi";

export const DashContactList = () => {
  const [messages, setMessages] = useState<TContact[]>([]);
  const [openMessage, setOpenMessage] = useState<string | null>(null);

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
    <div className="font-sans bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 shadow-xl p-6">
      <div className="mb-8">
        <UseText {...messagesAdmin} />
      </div>

      <div className="space-y-4">
        {messages.length === 0 ? (
          <div className="text-center p-8 bg-gray-800/30 rounded-xl border border-gray-700/50">
            <BiMessageDetail className="mx-auto text-4xl text-orange-400 mb-3" />
            <p className="text-gray-400">No messages yet.</p>
          </div>
        ) : (
          messages.map((message) => (
            <motion.div
              key={message.uuid}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="border border-gray-700/50 rounded-xl overflow-hidden bg-gray-800/30"
            >
              <button
                onClick={() => setOpenMessage(openMessage === message.uuid ? null : message.uuid || null)}
                className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-700/20 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-orange-400 to-yellow-500 flex items-center justify-center text-white font-medium">
                    {message.name[0].toUpperCase()}
                  </div>
                  <div>
                    <div className="text-gray-300 font-medium">
                      {message.name}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <BiEnvelope />
                      {message.email}
                    </div>
                  </div>
                </div>
                <div className="text-gray-400">
                  <BiMessageDetail className="text-xl" />
                </div>
              </button>

              <AnimatePresence>
                {openMessage === message.uuid && (
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: "auto" }}
                    exit={{ height: 0 }}
                    className="overflow-hidden border-t border-gray-700/50"
                  >
                    <div className="p-4 space-y-4">
                      <div className="bg-gray-700/20 rounded-lg p-4">
                        <div className="flex items-start justify-between gap-4">
                          <p className="text-gray-300 whitespace-pre-wrap flex-1">
                            {message.message}
                          </p>
                          <ButtonDelete
                            onDelete={deleteMessageByUuid}
                            uuid={message.uuid || ""}
                          />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
};
