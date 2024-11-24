'use client';
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { BiCodeAlt } from "react-icons/bi";
import { useSession } from "../context/SessionContext";

export default function Banner() {
  const [currentUser, setCurrentUser] = useState<string | null>(null);
  const { sessionUser } = useSession();
  console.log("Current:",sessionUser)
  useEffect(() => {
    const storedUser = localStorage.getItem("currentUser");

    if (storedUser) {
      setCurrentUser(storedUser);
    } else if (sessionUser) {
    
      setCurrentUser(sessionUser);
      localStorage.setItem("currentUser", sessionUser); 
    } else {
      setCurrentUser(null);
    }
  }, [sessionUser]);

  return (
    <section className="flex flex-col lg:flex-row items-center justify-center my-10 space-y-8 lg:space-y-0 w-full font-sans p-4 max-w-screen-lg mx-auto">
      <div className="flex items-center justify-center text-center space-x-4 w-full max-w-md p-4 rounded-md">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold bg-gradient-to-r from-orange-400 to-yellow-500 bg-clip-text text-transparent">
          Team
        </h1>
        <span className="text-orange-300">
          <BiCodeAlt size={50} />
        </span>
        <span className="text-transparent bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-4xl md:text-5xl lg:text-6xl font-extrabold">
          VoTech
        </span>
      </div>

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
          <Link
            href="/signup"
            className="mt-6 text-white px-6 py-4 bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-orange-500 hover:to-yellow-400 transition-colors rounded-lg font-medium shadow-lg shadow-orange-300"
          >
            Join Now!
          </Link>
        )}
      </div>
    </section>
  );
}
