import React from "react";
import Link from "next/link";
import { BiHomeAlt, BiLogIn, BiFileBlank } from "react-icons/bi";
import { GrUserAdmin } from "react-icons/gr";
import { endSession } from "../customHooks/setSession";
import { BiUpload } from "react-icons/bi";
import { useSession } from "../context/SessionContext";
import { CgWorkAlt } from "react-icons/cg";

export default function Footer() {
  const { sessionEmail } = useSession();
  return (
    <div className="fixed bottom-4 w-full z-50">
      <div className="mx-auto max-w-4xl px-6 py-3">
        <div
          className="w-full h-[60px] backdrop-blur-3xl rounded-full max-w-[380px] mx-auto px-4 py-2 flex justify-between items-center text-lg text-white shadow-lg"
          style={{
            background:
              "linear-gradient(to right, rgba(255, 204, 0, 0.8), rgba(255, 105, 0, 0.8))",
          }}
        >
          <Link href="/">
            <span className="cursor-pointer w-[48px] h-[48px] flex items-center justify-center transition-transform transform hover:scale-125 hover:text-orange-300">
              <BiHomeAlt size={24} />
            </span>
          </Link>
          <Link href="/projects">
            <span className="cursor-pointer w-[48px] h-[48px] flex items-center justify-center transition-transform transform hover:scale-125 hover:text-orange-300">
              <BiFileBlank size={24} />
            </span>
          </Link>
          {sessionEmail === "admin@votech.com" && (
            <Link href="/dashboard">
              <span className="cursor-pointer w-[48px] h-[48px] flex items-center justify-center transition-transform transform hover:scale-125 hover:text-orange-300">
                <GrUserAdmin size={24} />
              </span>
            </Link>
          )}
          <Link href="/upload">
            <span className="cursor-pointer w-[48px] h-[48px] flex items-center justify-center transition-transform transform hover:scale-125 hover:text-orange-300">
              <BiUpload size={24} />
            </span>
          </Link>
          <Link href="/post">
            <span className="cursor-pointer w-[48px] h-[48px] flex items-center justify-center transition-transform transform hover:scale-125 hover:text-orange-300">
              <CgWorkAlt size={24} />
            </span>
          </Link>
          <span
            className="cursor-pointer w-[48px] h-[48px] flex items-center justify-center transition-transform transform hover:scale-125 hover:text-orange-300"
            onClick={endSession}
          >
            <BiLogIn size={24} />
          </span>
        </div>
      </div>
    </div>
  );
}
