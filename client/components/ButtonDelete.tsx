"use client";
import React from "react";
import { BiTrash } from "react-icons/bi";

interface ButtonProps {
  uuid: string; 
  onDelete: (uuid: string) => void; 
}

export const ButtonDelete: React.FC<ButtonProps> = ({ uuid, onDelete }) => {
  return (
    <button
      className="px-4 py-1 my-2 ml-auto bg-gradient-to-r from-white to-red-600 hover:from-red-500 hover:to-white transition-colors rounded-lg font-medium shadow-lg shadow-red-400 text-white flex items-center gap-2"
      onClick={() => onDelete(uuid)}
    >
      <BiTrash size={20} />
    </button>
  );
};
