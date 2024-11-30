'use client'
import React from "react";
import { motion } from "framer-motion";
import { fadeIn } from "../helpers/variants";

export const FAQ = () => {
  return (
    <motion.div
      className="mt-14 max-w-3xl mx-auto bg-white shadow-lg rounded-xl overflow-hidden font-sans"
      variants={fadeIn({ direction: "up", delay: 0.3 })}
      initial="hidden"
      whileInView={"show"}
      viewport={{ once: false, amount: 0.3 }}
      whileHover={{
        scale: 1.02,
        boxShadow: "0 10px 20px rgba(0, 0, 0, 0.1)",
        transition: { type: "spring", stiffness: 300, damping: 20 },
      }}
    >
      <section className="py-16 px-6 text-gray-400">
        <div className="container mx-auto text-center mb-12">
          <h2 className="text-4xl font-extrabold text-transparent bg-gradient-to-r from-orange-400 to-yellow-500 bg-clip-text mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-gray-400">
            Find answers to some common questions below.
          </p>
        </div>
        <div className="space-y-8">
          <details className="group rounded-lg border border-gray-200 bg-gray-50 shadow-sm overflow-hidden transition-all">
            <summary className="py-4 px-6 text-xl font-medium text-gray-400 cursor-pointer transition-colors duration-300 ease-in-out hover:text-orange-500 focus:text-orange-500 focus:outline-none">
              How can I participate in the platform?
            </summary>
            <div className="px-6 pb-4 text-gray-400 transition-all duration-300 ease-in-out group-open:max-h-screen group-open:opacity-100 group-open:translate-y-0 group-close:opacity-0 group-close:translate-y-6">
              <p>
                To participate, simply register on our platform and subscribe
                for just $5 per month. This will give you access to propose
                projects, vote for them, and, if your application is accepted,
                participate in their development.
              </p>
            </div>
          </details>

          <details className="group rounded-lg border border-gray-200 bg-gray-50 shadow-sm overflow-hidden transition-all">
            <summary className="py-4 px-6 text-xl font-medium text-gray-400 cursor-pointer transition-colors duration-300 ease-in-out hover:text-orange-500 focus:text-orange-500 focus:outline-none">
              What does the monthly subscription include?
            </summary>
            <div className="px-6 pb-4 text-gray-400 transition-all duration-300 ease-in-out group-open:max-h-screen group-open:opacity-100 group-open:translate-y-0 group-close:opacity-0 group-close:translate-y-6">
              <p>
                The monthly subscription includes the ability to: - Propose
                your own projects. - Vote for the projects you prefer. - Apply
                to participate in the development of the winning project. -
                Access the collaborative portfolio to showcase completed
                projects.
              </p>
            </div>
          </details>

          <details className="group rounded-lg border border-gray-200 bg-gray-50 shadow-sm overflow-hidden transition-all">
            <summary className="py-4 px-6 text-xl font-medium text-gray-400 cursor-pointer transition-colors duration-300 ease-in-out hover:text-orange-500 focus:text-orange-500 focus:outline-none">
              How do the voting sessions work?
            </summary>
            <div className="px-6 pb-4 text-gray-400 transition-all duration-300 ease-in-out group-open:max-h-screen group-open:opacity-100 group-open:translate-y-0 group-close:opacity-0 group-close:translate-y-6">
              <p>
                Voting takes place weekly. Each member of the platform can
                vote for one or more projects proposed during that week. The
                project with the most votes at the end of the week will be
                selected for development.
              </p>
            </div>
          </details>

          <details className="group rounded-lg border border-gray-200 bg-gray-50 shadow-sm overflow-hidden transition-all">
            <summary className="py-4 px-6 text-xl font-medium text-gray-400 cursor-pointer transition-colors duration-300 ease-in-out hover:text-orange-500 focus:text-orange-500 focus:outline-none">
              Who can work on the winning project?
            </summary>
            <div className="px-6 pb-4 text-gray-400 transition-all duration-300 ease-in-out group-open:max-h-screen group-open:opacity-100 group-open:translate-y-0 group-close:opacity-0 group-close:translate-y-6">
              <p>
                Only members who have applied for the winning project can
                participate in its development. This ensures that the team is
                committed and motivated to carry it out.
              </p>
            </div>
          </details>

          <details className="group rounded-lg border border-gray-200 bg-gray-50 shadow-sm overflow-hidden transition-all">
            <summary className="py-4 px-6 text-xl font-medium text-gray-400 cursor-pointer transition-colors duration-300 ease-in-out hover:text-orange-500 focus:text-orange-500 focus:outline-none">
              What happens with completed projects?
            </summary>
            <div className="px-6 pb-4 text-gray-400 transition-all duration-300 ease-in-out group-open:max-h-screen group-open:opacity-100 group-open:translate-y-0 group-close:opacity-0 group-close:translate-y-6">
              <p>
                Completed projects are published on the platform, and all
                participants can add them to their professional portfolios.
                This allows them to demonstrate their experience and teamwork
                skills.
              </p>
            </div>
          </details>

          <details className="group rounded-lg border border-gray-200 bg-gray-50 shadow-sm overflow-hidden transition-all">
            <summary className="py-4 px-6 text-xl font-medium text-gray-400 cursor-pointer transition-colors duration-300 ease-in-out hover:text-orange-500 focus:text-orange-500 focus:outline-none">
              Can I cancel my subscription at any time?
            </summary>
            <div className="px-6 pb-4 text-gray-400 transition-all duration-300 ease-in-out group-open:max-h-screen group-open:opacity-100 group-open:translate-y-0 group-close:opacity-0 group-close:translate-y-6">
              <p>
                Yes, you can cancel your subscription at any time from your
                profile. You will still have access to the platform until the
                end of the period you have already paid for.
              </p>
            </div>
          </details>
        </div>
      </section>
    </motion.div>
  );
};
