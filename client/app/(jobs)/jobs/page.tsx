import React from "react";
import { JobsList } from "../../../components/JobsList";
import { UseText } from "../../../customHooks/useText";
import { TMessage } from "../../../types/typeMessages";

const messagesJobs: TMessage = {
  messageOne: "Explore our Job Offerings.",
  messageTwo:
    "Discover exciting job opportunities crafted by passionate developers. From creative projects to innovative solutions, we offer real-world challenges where you can grow and showcase your talent.",
  messageThree: "",
  messageFour: "",
};

const page = () => {
  return (
    <div>
      <div className="bg-white container mx-auto mt-5">
        <UseText {...messagesJobs} />
      </div>
      <JobsList />
    </div>
  );
};

export default page;
