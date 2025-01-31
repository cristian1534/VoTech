'use client'
import React from "react";
import { motion } from "framer-motion";
import { fadeIn } from "../helpers/variants";

export const FAQ = () => {
  return (
    <motion.div
      className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-16 font-sans"
      variants={fadeIn({ direction: "up", delay: 0.2 })}
      initial="hidden"
      whileInView={"show"}
      viewport={{ once: false, amount: 0.3 }}
    >
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className="max-w-3xl mx-auto"
          variants={fadeIn({ direction: "up", delay: 0.3 })}
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent mb-6">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-300">
              Find answers to some common questions below.
            </p>
          </div>

          <div className="space-y-6">
            <motion.details 
              className="group rounded-xl border border-gray-700/50 bg-gray-800/50 backdrop-blur-sm overflow-hidden transition-all duration-300"
              variants={fadeIn({ direction: "right", delay: 0.4 })}
            >
              <summary className="py-4 px-6 text-xl font-medium text-gray-300 cursor-pointer hover:text-orange-400 focus:text-orange-400 transition-colors">
                How can I participate in the platform?
              </summary>
              <div className="px-6 pb-4 text-gray-400 group-open:animate-fadeIn">
                <p>
                  To participate, simply register on our platform and subscribe
                  for just U$D 5 per month. This will give you access to propose
                  projects, vote for them and participate in their development.
                </p>
              </div>
            </motion.details>

            <motion.details 
              className="group rounded-xl border border-gray-700/50 bg-gray-800/50 backdrop-blur-sm overflow-hidden transition-all duration-300"
              variants={fadeIn({ direction: "right", delay: 0.5 })}
            >
              <summary className="py-4 px-6 text-xl font-medium text-gray-300 cursor-pointer hover:text-orange-400 focus:text-orange-400 transition-colors">
                What does the monthly subscription include?
              </summary>
              <div className="px-6 pb-4 text-gray-400 group-open:animate-fadeIn">
                <ul className="list-disc pl-4 space-y-2">
                  <li>Propose your own projects</li>
                  <li>Vote for the projects you prefer</li>
                  <li>Apply to participate in the development of the MVPs</li>
                  <li>Access the collaborative portfolio to showcase completed projects</li>
                  <li>Public Chat</li>
                  <li>Freelance Jobs Offerings</li>
                  <li>Discord Services</li>
                </ul>
              </div>
            </motion.details>

            <motion.details 
              className="group rounded-xl border border-gray-700/50 bg-gray-800/50 backdrop-blur-sm overflow-hidden transition-all duration-300"
              variants={fadeIn({ direction: "right", delay: 0.6 })}
            >
              <summary className="py-4 px-6 text-xl font-medium text-gray-300 cursor-pointer hover:text-orange-400 focus:text-orange-400 transition-colors">
                How do the voting sessions work?
              </summary>
              <div className="px-6 pb-4 text-gray-400 group-open:animate-fadeIn">
                <p>
                  Voting takes place weekly. Each member of the platform can vote for one or more projects proposed during that week. The project with the most votes at the end of the week will be recognized through announcements on social media, newsletters, and the platform homepage. Once developed, the project will receive additional recognition, such as being featured as a success story or showcased prominently on the platform.
                </p>
              </div>
            </motion.details>

            <motion.details 
              className="group rounded-xl border border-gray-700/50 bg-gray-800/50 backdrop-blur-sm overflow-hidden transition-all duration-300"
              variants={fadeIn({ direction: "right", delay: 0.7 })}
            >
              <summary className="py-4 px-6 text-xl font-medium text-gray-300 cursor-pointer hover:text-orange-400 focus:text-orange-400 transition-colors">
                Who can work on the winning project?
              </summary>
              <div className="px-6 pb-4 text-gray-400 group-open:animate-fadeIn">
                <p>
                  Only members who have applied for the winning project can
                  participate in its development. This ensures that the team is
                  committed and motivated to carry it out.
                </p>
              </div>
            </motion.details>

            <motion.details 
              className="group rounded-xl border border-gray-700/50 bg-gray-800/50 backdrop-blur-sm overflow-hidden transition-all duration-300"
              variants={fadeIn({ direction: "right", delay: 0.8 })}
            >
              <summary className="py-4 px-6 text-xl font-medium text-gray-300 cursor-pointer hover:text-orange-400 focus:text-orange-400 transition-colors">
                What happens with completed projects?
              </summary>
              <div className="px-6 pb-4 text-gray-400 group-open:animate-fadeIn">
                <p>
                  Completed projects are published on the platform, and all
                  participants can add them to their professional portfolios.
                  This allows them to demonstrate their experience and teamwork
                  skills.
                </p>
              </div>
            </motion.details>

            <motion.details 
              className="group rounded-xl border border-gray-700/50 bg-gray-800/50 backdrop-blur-sm overflow-hidden transition-all duration-300"
              variants={fadeIn({ direction: "right", delay: 0.9 })}
            >
              <summary className="py-4 px-6 text-xl font-medium text-gray-300 cursor-pointer hover:text-orange-400 focus:text-orange-400 transition-colors">
                Can I cancel my subscription at any time?
              </summary>
              <div className="px-6 pb-4 text-gray-400 group-open:animate-fadeIn">
                <p>
                  Yes, you can cancel your subscription at any time from your
                  profile. You will still have access to the platform until the
                  end of the period you have already paid for.
                </p>
              </div>
            </motion.details>
          </div>
        </motion.div>
      </div>

      <div className="absolute top-0 right-0 -mt-16 -mr-16 w-64 h-64 bg-yellow-300 rounded-full opacity-20 transform rotate-45"></div>
      <div className="absolute bottom-0 left-0 -mb-16 -ml-16 w-64 h-64 bg-orange-300 rounded-full opacity-20 transform -rotate-45"></div>
    </motion.div>
  );
};
