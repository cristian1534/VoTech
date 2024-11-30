"use client";
import React from "react";
import { BiTrash } from "react-icons/bi";

interface ButtonProps {
  onDelete: (uuid: string) => Promise<void>;
  uuid: string;
  className?: string;
}

export const ButtonDelete = ({ onDelete, uuid, className }: ButtonProps) => {
  return (
    <button
      onClick={() => onDelete(uuid)}
      className={`px-4 py-2 shadow-md shadow-red-500 bg-gradient-to-r from-white to-red-600 hover:from-red-500 hover:to-white rounded-md transition-colors text-white  ${className}`}
    >
      <BiTrash size={24} />
    </button>
  );
};
