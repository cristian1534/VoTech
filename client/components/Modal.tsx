import React, { useState } from "react";
import { createUserProjectRelation } from "../lib/api";
import { useSession } from "../context/SessionContext";

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
      <div
        className="bg-green-500 border-t border-b border-green-200 text-white px-4 py-3 my-3 shadow-2xl font-sans rounded-md"
        role="alert"
      >
        <div className="bg-white text-green-500 text-center font-bold p-2 rounded-md">
          <p className="text-sm">{message}</p>
        </div>
        <p className="font-bold">Important Information</p>
        <p className="text-sm">
          We will get in touch via email to confirm once the Team is ready.
        </p>
      </div>
    );
  };

  const applyWarning = () => {
    return (
      <div
        className="bg-red-400 border-t border-b border-orange-200 text-white px-4 py-3 my-3 shadow-2xl font-sans rounded-md"
        role="alert"
      >
        <p className="font-bold">Sing In is required</p>
        <p className="text-sm">If you do not have account, please Sign Up.</p>
      </div>
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
    <div
      className="fixed top-0 left-0 right-0 z-[80] flex items-center justify-center w-full h-full bg-gray-900 bg-opacity-50"
      role="dialog"
      tabIndex={-1}
      aria-labelledby="modal-label"
    >
      <div className="sm:max-w-lg sm:w-full m-3 sm:mx-auto font-sans">
        <div className="flex flex-col bg-white border shadow-sm rounded-xl">
          <div className="flex justify-between items-center py-3 px-4 border-b">
            <h3 id="modal-label" className="font-bold text-orange-300">
              Apply for this Project
            </h3>
            <button
              type="button"
              onClick={closeModal}
              className="rounded-full bg-gray-100 text-gray-400 hover:bg-gray-200 focus:outline-none"
              aria-label="Close"
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
            </button>
          </div>
          <div className="p-4 text-center">
            <p className="text-gray-400">
              You will apply to be part of the team. You will receive an email
              when it is ready to start developing this awesome project!
            </p>
            {showMessage && applyMessage()}
            {showWarning && applyWarning()}
          </div>
          <div className="flex justify-end items-center gap-x-2 py-3 px-4 border-t">
            <button
              className="text-white px-6 py-3 bg-gradient-to-r from-white to-red-600 hover:from-red-600 hover:to-white rounded-lg"
              onClick={closeModal}
            >
              Close
            </button>
            <button
              className="text-white px-6 py-3 bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-orange-500 hover:to-yellow-400 rounded-lg"
              onClick={handleApply}
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
