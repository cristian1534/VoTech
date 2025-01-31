"use client";
import React, { useEffect, useState } from "react";
import { TUserProject } from "@/types/typeUserProject";
import { UseText } from "../customHooks/useText";
import { TMessage } from "../types/typeMessages";
import { getAllUserProject } from "../lib/api";
import { BiGroup, BiCalendar, BiEnvelope } from "react-icons/bi";
import { motion, AnimatePresence } from "framer-motion";

export const DashUserProjectList = () => {
  const [userProjects, setUserProjects] = useState<TUserProject[]>([]);
  const [openProject, setOpenProject] = useState<string | null>(null);
  
  const messagesAdmin: TMessage = {
    messageOne: "Teams and Projects",
    messageTwo: "Check information regarding what our Members have applied for.",
    messageThree: "",
    messageFour: "",
  };

  useEffect(() => {
    const fetchUserProjects = async () => {
      const data = await getAllUserProject();
      setUserProjects(data || []);
    };
    fetchUserProjects();
  }, []);

  const groupedProjects = userProjects.reduce((acc, relation) => {
    if (!acc[relation.project_name]) {
      acc[relation.project_name] = [];
    }
    acc[relation.project_name].push(relation);
    return acc;
  }, {} as Record<string, TUserProject[]>);

  return (
    <div className="font-sans bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 shadow-xl p-6">
      <div className="mb-8">
        <UseText {...messagesAdmin} />
      </div>

      <div className="space-y-4">
        {Object.entries(groupedProjects).map(([projectName, relations]) => (
          <div
            key={projectName}
            className="border border-gray-700/50 rounded-xl overflow-hidden bg-gray-800/30"
          >
            <button
              onClick={() => setOpenProject(openProject === projectName ? null : projectName)}
              className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-700/20 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-orange-500/10 flex items-center justify-center">
                  <BiGroup className="text-orange-400" />
                </div>
                <span className="text-lg font-medium text-gray-300">
                  {projectName}
                </span>
              </div>
              <div className="text-sm text-gray-400">
                {relations.length} member{relations.length !== 1 ? 's' : ''}
              </div>
            </button>

            <AnimatePresence>
              {openProject === projectName && (
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: "auto" }}
                  exit={{ height: 0 }}
                  className="overflow-hidden border-t border-gray-700/50"
                >
                  <div className="p-4 space-y-3">
                    {relations.map((relation) => (
                      <div
                        key={relation.user_email}
                        className="bg-gray-700/20 rounded-lg p-4 space-y-3"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-orange-400 to-yellow-500 flex items-center justify-center text-white font-medium">
                            {relation.user_name[0].toUpperCase()}
                          </div>
                          <div>
                            <div className="text-gray-300 font-medium">
                              {relation.user_name}
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-400">
                              <BiEnvelope />
                              {relation.user_email}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-400">
                          <BiCalendar />
                          Applied: {relation.applied_at
                            ? new Date(relation.applied_at).toLocaleDateString("en-US", {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                              })
                            : "N/A"}
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
};
