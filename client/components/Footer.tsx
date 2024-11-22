import React from "react";
import Link from "next/link";
import { BiHomeAlt, BiLogIn, BiLogOut, BiFileBlank } from "react-icons/bi";

export default function Footer() {
  return (
    <div className="container">
      <nav className="fixed bottom-2 lg:bottom-8 w-full overflow-hidden z-50">
        <div className="container mx-auto">
          <div
            className="w-full h-[70px] backdrop-blur-2xl rounded-full max-w-[460px] mx-auto px-4 py-2 flex justify-between text-lg text-white"
            style={{
              background: "linear-gradient(to right, rgba(255, 204, 0, 0.7), rgba(255, 105, 0, 0.7))",
            }}
          >
            <Link href="/">
              <span className="cursor-pointer w-[50px] h-[50px] flex items-center justify-center">
                <BiHomeAlt />
              </span>
            </Link>
            <Link href="/project">
              <span className="cursor-pointer w-[50px] h-[50px] flex items-center justify-center">
                <BiFileBlank />
              </span>
            </Link>
            <Link href="/signin">
              <span className="cursor-pointer w-[50px] h-[50px] flex items-center justify-center">
                <BiLogIn />
              </span>
            </Link>
            <Link href="/signup">
              <span className="cursor-pointer w-[50px] h-[50px] flex items-center justify-center">
                <BiLogOut />
              </span>
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
}
