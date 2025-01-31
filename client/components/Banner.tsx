"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { BiCodeAlt } from "react-icons/bi";
import { FiArrowRight } from "react-icons/fi";
import { useSession } from "../context/SessionContext";
import { motion } from "framer-motion";
import { fadeIn } from "../helpers/variants";
import Cookies from "js-cookie";

export default function Banner() {
  const [currentUser, setCurrentUser] = useState<string | null>(null);
  const { sessionUser } = useSession();

  useEffect(() => {
    const storedUser = Cookies.get("user");
    if (storedUser) {
      setCurrentUser(storedUser);
    } else if (sessionUser) {
      setCurrentUser(sessionUser);
      Cookies.set("currentUser", sessionUser, {
        expires: 7,
        secure: true,
        sameSite: "strict",
      });
    } else {
      setCurrentUser(null);
    }
  }, [sessionUser]);

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-24 font-sans">
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          <motion.div
            className="lg:w-1/2 mb-10 lg:mb-0"
            variants={fadeIn({ direction: "right", delay: 0.3 })}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.3 }}
          >
            <h1 className="text-5xl lg:text-7xl font-bold mb-6 text-white">
              Team <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">VoTech</span>
            </h1>
            <p className="text-xl text-gray-400 mb-8 leading-relaxed">
              Join a <span className="text-yellow-400 font-semibold">PROFESSIONAL TEAM</span> and 
              contribute to the development of <span className="text-orange-400 font-semibold">IMPACTFUL PROJECTS</span>.
            </p>
            {currentUser ? (
              <motion.div 
                className="inline-block bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-bold py-4 px-8 rounded-xl shadow-lg shadow-orange-500/20"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <p className="text-lg">Welcome, {currentUser}! 👋</p>
              </motion.div>
            ) : (
              <div className="space-y-6">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    href="/signup"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-bold py-4 px-8 rounded-xl shadow-lg shadow-orange-500/20 hover:shadow-orange-500/30 transition-all duration-300"
                  >
                    Join Now! <FiArrowRight className="text-xl" />
                  </Link>
                </motion.div>
                <motion.div
                  whileHover={{ y: -2 }}
                >
                  <Link 
                    href="/signin" 
                    className="text-orange-400 hover:text-orange-300 font-medium block py-2 transition-colors"
                  >
                    Already Registered? Sign In →
                  </Link>
                </motion.div>
              </div>
            )}
          </motion.div>
          <motion.div
            className="lg:w-1/2"
            variants={fadeIn({ direction: "left", delay: 0.5 })}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.3 }}
          >
            <motion.div 
              className="bg-gradient-to-br from-orange-400 to-yellow-500 p-10 rounded-2xl shadow-2xl transform hover:rotate-0 transition duration-300 relative overflow-hidden"
              whileHover={{ scale: 1.02, rotate: 0 }}
              initial={{ rotate: -3 }}
            >
              <div className="absolute -right-8 -top-8 w-32 h-32 bg-yellow-300/20 rounded-full blur-xl"></div>
              <BiCodeAlt className="text-white text-7xl mb-6" />
              <h2 className="text-4xl font-bold text-white mb-4">Code with Purpose</h2>
              <p className="text-xl text-yellow-50 leading-relaxed">
                Develop your skills while making a real impact in the tech world.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
      
      {/* Enhanced background elements */}
      <div className="absolute top-0 right-0 -mt-16 -mr-16 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 -mb-16 -ml-16 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl"></div>
    </section>
  );
}
