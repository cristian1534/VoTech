"use client"
import React, { useState } from "react";
import { createUserProjectRelation } from "../lib/api";
import { useSession } from "../context/SessionContext";
import { motion } from "framer-motion";

interface ModalProps {
  isOpen: boolean;
  closeModal: () => void;
  id: number | null;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, closeModal, id }) => {
  const { sessionEmail } = useSession();
  const [showMessage, setShowMessage] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const [message, setMessage] = useState<string>();

  const applyMessage = () => {
    return (
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-green-500/10 border border-green-500/50 text-green-400 px-6 py-4 my-4 rounded-lg backdrop-blur-sm"
        role="alert"
      >
        <div className="bg-gray-800/50 text-green-400 text-center font-medium p-3 rounded-lg mb-3">
          <p>{message}</p>
        </div>
        <p className="font-bold mb-2">Important Information</p>
        <p className="text-sm">
          We will get in touch via email to confirm once the Team is ready.
        </p>
      </motion.div>
    );
  };

  const applyWarning = () => {
    return (
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-red-500/10 border border-red-500/50 text-red-400 px-6 py-4 my-4 rounded-lg backdrop-blur-sm"
        role="alert"
      >
        <p className="font-bold mb-2">Sign In is required</p>
        <p className="text-sm">If you do not have account, please Sign Up.</p>
      </motion.div>
    );
  };

  if (!isOpen) return null;

  const handleApply = async () => {
    if (!sessionEmail) {
      setShowWarning(true);
      return;
    }
    if (id === null) {
      alert("No card ID selected.");
      return;
    }
    const response = await createUserProjectRelation(sessionEmail, id);
    if (typeof response === "string") {
      setMessage(response);
    } else {
      setMessage("An unexpected error occurred.");
    }
    setShowMessage(true);
    closeModal();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[80] flex items-center justify-center p-4 bg-gray-900/80 backdrop-blur-sm"
      onClick={closeModal}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-lg bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-xl border border-gray-700/50 shadow-xl"
      >
        <div className="flex justify-between items-center py-4 px-6 border-b border-gray-700/50">
          <h3 className="text-xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
            Apply for this Project
          </h3>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={closeModal}
            className="text-gray-400 hover:text-orange-400 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 6L6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </motion.button>
        </div>

        <div className="p-6">
          <p className="text-gray-300 text-center mb-4">
            You will apply to be part of the team. You will receive an email
            when it is ready to start developing this awesome project!
          </p>
          {showMessage && applyMessage()}
          {showWarning && applyWarning()}
        </div>

        <div className="flex justify-end items-center gap-4 py-4 px-6 border-t border-gray-700/50">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-6 py-2.5 text-white bg-red-500/10 hover:bg-red-500/20 border border-red-500/50 rounded-lg transition-colors"
            onClick={closeModal}
          >
            Cancel
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-6 py-2.5 bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-orange-500 hover:to-yellow-400 text-white rounded-lg shadow-lg shadow-orange-500/20 transition-all duration-300"
            onClick={handleApply}
          >
            Confirm
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};
