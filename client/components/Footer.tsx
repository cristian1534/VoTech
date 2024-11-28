import React from "react";
import Link from "next/link";
import { BiHomeAlt, BiLogIn, BiFileBlank } from "react-icons/bi";
import { GrUserAdmin } from "react-icons/gr";
import { endSession } from "../customHooks/setSession";

export default function Footer() {
  return (
    <div className="container">
      <nav className="fixed bottom-2 lg:bottom-8 w-full overflow-hidden z-50">
        <div className="container mx-auto">
          <div
            className="w-full h-[50px] backdrop-blur-2xl rounded-full max-w-[350px] mx-auto px-4 py-2 flex justify-between items-center text-lg text-white"
            style={{
              background:
                "linear-gradient(to right, rgba(255, 204, 0, 0.7), rgba(255, 105, 0, 0.7))",
            }}
          >
            <Link href="/">
              <span className="cursor-pointer w-[40px] h-[40px] flex items-center justify-center transition-transform transform hover:scale-125">
                <BiHomeAlt />
              </span>
            </Link>
            <Link href="/projects">
              <span className="cursor-pointer w-[40px] h-[40px] flex items-center justify-center transition-transform transform hover:scale-125">
                <BiFileBlank />
              </span>
            </Link>
            <Link href="/dashboard">
              <span className="cursor-pointer w-[40px] h-[40px] flex items-center justify-center transition-transform transform hover:scale-125">
                <GrUserAdmin />
              </span>
            </Link>
            <span
              className="cursor-pointer w-[40px] h-[40px] flex items-center justify-center transition-transform transform hover:scale-125"
              onClick={endSession}
            >
              <BiLogIn />
            </span>
          </div>
        </div>
      </nav>
    </div>
  );
}
