import React from "react";
import { TMessage } from '../types/typeMessages';

export const UseText = ({ messageOne, messageTwo, messageThree, messageFour }: TMessage) => {
  return (
    <div>
      <div className="flex flex-col items-center justify-center p-6 w-full font-sans shadow-lg">
        <div className="flex flex-col items-center justify-center space-y-4 rounded-md m-5 w-full max-w-full p-5">
            <p className="text-lg md:text-xl font-medium text-orange-400 text-center" >

            {messageOne}{" "}
            </p>
          <p className="text-lg md:text-xl font-medium text-gray-400 text-center">
            {messageTwo && <span>{messageTwo}</span>}{" "}
            {messageThree}{" "}
            {messageFour && <span>{messageFour}</span>}
          </p>
        </div>
      </div>
    </div>
  );
};
