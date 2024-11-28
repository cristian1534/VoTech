import React from "react";

interface EmptyDataProps {
  text: string;
}
export const EmptyData = ({ text }: EmptyDataProps) => {
  return (
    <div className="bg-white container mx-auto p-4 shadow-lg rounded-sm">
      <p className="text-center text-orange-400">{text}</p>
    </div>
  );
};
