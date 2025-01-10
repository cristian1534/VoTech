"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { BiCodeAlt } from "react-icons/bi";
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
    <section className="relative overflow-hidden bg-gradient-to-br from-orange-100 to-yellow-50 py-20 font-sans">
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between">
          <motion.div
            className="lg:w-1/2 mb-10 lg:mb-0"
            variants={fadeIn({ direction: "right", delay: 0.3 })}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.3 }}
          >
            <h1 className="text-5xl lg:text-6xl font-bold mb-6 text-gray-500">
              Team <span className="text-orange-500">VoTech</span>
            </h1>
            <p className="text-xl text-gray-500 mb-8">
              Join a <span className="font-semibold text-orange-500">PROFESSIONAL TEAM</span> and 
              contribute to the development of <span className="font-semibold text-orange-500">IMPACTFUL PROJECTS</span>.
            </p>
            {currentUser ? (
              <div className="inline-block bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-bold py-3 px-6 rounded-lg shadow-lg transform transition duration-300 hover:scale-105">
                <p className="text-lg">Welcome, {currentUser}!</p>
              </div>
            ) : (
              <div className="space-y-4">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    // href="https://www.sandbox.paypal.com/ncp/payment/8F9AZY58Z77J6"
                    href="/signup"
                    // target="_blank"
                    rel="noreferrer"
                    className="inline-block bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-bold py-3 px-8 rounded-lg shadow-lg transform transition duration-300 hover:shadow-xl"
                  >
                    Join Now!
                  </Link>
                </motion.div>
                <div>
                  <Link href="/signin" className="text-orange-500 hover:text-orange-600 font-medium block py-2">
                    Already Registered?
                  </Link>
                </div>
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
            <div className="bg-gradient-to-br from-orange-400 to-yellow-500 p-8 rounded-2xl shadow-2xl transform -rotate-3 hover:rotate-0 transition duration-300">
              <BiCodeAlt className="text-white text-6xl mb-4" />
              <h2 className="text-4xl font-bold text-white mb-2">Code with Purpose</h2>
              <p className="text-lg text-yellow-100">
                Develop your skills while making a real impact in the tech world.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
      <div className="absolute top-0 right-0 -mt-16 -mr-16 w-64 h-64 bg-yellow-300 rounded-full opacity-20 transform rotate-45"></div>
      <div className="absolute bottom-0 left-0 -mb-16 -ml-16 w-64 h-64 bg-orange-300 rounded-full opacity-20 transform -rotate-45"></div>
    </section>
  );
}
