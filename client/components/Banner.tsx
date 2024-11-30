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
  console.log("Current:", sessionUser);

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
    <section className="flex flex-col lg:flex-row items-center justify-center my-10 space-y-8 lg:space-y-0 w-full font-sans p-4 max-w-screen-lg mx-auto">
      <motion.div
        className="flex items-center justify-center text-center space-x-4 w-full max-w-md p-4 rounded-md "
        variants={fadeIn({ direction: "right", delay: 0.3 })}
        initial="hidden"
        whileInView={"show"}
        viewport={{ once: false, amount: 0.3 }}
      >
        <div className="flex flex-col items-center justify-center text-center space-x-4 w-full max-w-md p-6 rounded-md shadow-2xl mb-8 bg-gradient-to-r from-orange-400 to-yellow-500">
          <h1 className="text-5xl font-extrabold text-transparent bg-clip-text text-white">
            Team
          </h1>
          <span className="text-white">
            <BiCodeAlt size={48} />
          </span>
          <h1 className="text-5xl font-extrabold text-transparent bg-clip-text text-white">
            VoTech
          </h1>
        </div>
      </motion.div>

      <div className="flex flex-col items-center justify-center space-y-6 p-6 w-full max-w-md">
        <p className="text-lg md:text-xl font-medium text-gray-400 text-center">
          Join a{" "}
          <span className="font-semibold text-transparent bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text">
            PROFESSIONAL TEAM
          </span>{" "}
          and contribute to the development of{" "}
          <span className="font-semibold text-transparent bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text">
            IMPACTFUL PROJECTS
          </span>
          .
        </p>
        {currentUser ? (
          <div className="mt-6 text-white px-6 py-4 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-lg font-medium shadow-lg shadow-orange-300">
            <p className="text-lg">Welcome {currentUser}!</p>
          </div>
        ) : (
          <motion.div
            whileTap={{ scale: 0.9 }}
            animate={{
              scale: [1, 1.2, 1],
              transition: {
                duration: 2,
                repeat: Infinity,
                repeatType: "loop",
                ease: "easeInOut",
              },
            }}
          >
            <Link
              href="/signup"
              className="mt-6 text-white px-6 py-4 bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-orange-500 hover:to-yellow-400 transition-colors rounded-lg font-medium shadow-lg shadow-orange-300"
            >
              Join Now!
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  );
}
