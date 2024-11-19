import React from "react";

export default function Banner() {
  return (
    <section className="flex flex-col items-center justify-center my-10 space-y-8 w-full font-sans">
      <div className="flex items-center justify-center text-center space-x-4 w-full uppercase">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold bg-gradient-to-r from-orange-400 to-yellow-500 bg-clip-text text-transparent">
          Team
        </h1>
        <span
          className="text-transparent bg-gradient-to-r 
bg-gradient- from-yellow-400 to-orange-500
 bg-clip-text text-4xl md:text-5xl lg:text-6xl font-extrabold"
        >
          VoTech
        </span>
      </div>

      <div className="flex flex-col items-center justify-center p-6 w-full">
        <div className="flex flex-col items-center justify-center space-y-4 rounded-md m-5 w-full max-w-full p-5">
          <p className="text-lg md:text-xl font-medium text-gray-400 text-center">
            Join a{" "}
            <span
              className="font-semibold text-transparent bg-gradient-to-r 
bg-gradient- from-yellow-400 to-orange-500
 bg-clip-text"
            >
              PROFESSIONAL TEAM
            </span>{" "}
            and contribute to the development of{" "}
            <span
              className="font-semibold text-transparent bg-gradient-to-r 
bg-gradient- from-yellow-400 to-orange-500
 bg-clip-text"
            >
              IMPACTFUL PROJECTS
            </span>
            .
          </p>
        </div>
        <button
          className="mt-4 text-white px-6 py-4 bg-gradient-to-r 
bg-gradient- from-yellow-400 to-orange-500
 hover:from-orange-500 hover:to-yellow-400 transition-colors rounded-lg font-medium shadow-orange-300 shadow-lg"
        >
          Join Us
        </button>
      </div>
    </section>
  );
}
