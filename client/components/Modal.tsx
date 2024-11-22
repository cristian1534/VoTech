import React from 'react';

interface ModalProps {
  isOpen: boolean;
  closeModal: () => void;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, closeModal }) => {
  if (!isOpen) return null; 

  return (
    <div
      id="hs-basic-modal"
      className="fixed top-0 left-0 right-0 z-[80] flex items-center justify-center w-full h-full bg-gray-900 bg-opacity-50"
      role="dialog"
      tabIndex={-1}
      aria-labelledby="hs-basic-modal-label"
    >
      <div className="sm:max-w-lg sm:w-full m-3 sm:mx-auto font-sans">
        <div className="flex flex-col bg-white border shadow-sm rounded-xl pointer-events-auto">
          <div className="flex justify-between items-center py-3 px-4 border-b">
            <h3 id="hs-basic-modal-label" className="font-bold text-orange-300">
              Apply for this Project
            </h3>
            <button
              type="button"
              onClick={closeModal}
              className="size-8 inline-flex justify-center items-center gap-x-2 rounded-full border border-transparent bg-gray-100 text-gray-400 hover:bg-gray-200 focus:outline-none focus:bg-gray-200"
              aria-label="Close"
            >
              <span className="sr-only">Close</span>
              <svg
                className="shrink-0 size-4"
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
          <div className="p-4 overflow-y-auto">
            <p className="mt-1 text-gray-400 text-center">
              You will apply to be part of the Team. You will receive an email when it is ready to start developing this awesome project!
            </p>
          </div>
          <div className="flex justify-end items-center gap-x-2 py-3 px-4 border-t">
          <button className="mt-4 text-white px-6 py-3 bg-gradient-to-r from-red-500 to-white hover:from-white hover:to-red-500 transition-colors rounded-lg font-medium shadow-lg shadow-red-300" onClick={closeModal}>
                Close
              </button>
            <button className="mt-4 text-white px-6 py-3 bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-orange-500 hover:to-yellow-400 transition-colors rounded-lg font-medium shadow-lg shadow-orange-300">
                Confirm
              </button>
          </div>
        </div>
      </div>
    </div>
  );
};
